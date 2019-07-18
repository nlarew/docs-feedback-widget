import React from "react";
import { Machine, assign, send } from "xstate";
import { useMachine } from "@xstate/react";

const capitalizeFirst = str => str.charAt(0).toUpperCase() + str.slice(1);

const feedbackStateForType = (feedbackType, toggleActionName) => ({
  [feedbackType]: {
    id: feedbackType,
    initial: "notSelected",
    states: {
      notSelected: {
        entry: [`toggle${capitalizeFirst(feedbackType)}`],
        on: {
          [toggleActionName]: {
            target: "selected",
          },
        },
      },
      selected: {
        entry: [`toggle${capitalizeFirst(feedbackType)}`],
        on: {
          [toggleActionName]: {
            target: "notSelected",
          },
        },
      },
    },
  },
});

// prettier-ignore
const feedbackTypesState = {
  id: "feedbackTypes",
  type: "parallel",
  states: {
    ...feedbackStateForType("needHelp", "TOGGLE_NEED_HELP"),
    ...feedbackStateForType("unexpectedBehavior", "TOGGLE_UNEXPECTED_BEHAVIOR"),
    ...feedbackStateForType("docsIssue", "TOGGLE_DOCS_ISSUE"),
    ...feedbackStateForType("somethingElse", "TOGGLE_SOMETHING_ELSE"),
  },
};
const toggleNeedHelp = assign({
  type: context => ({
    ...context.type,
    needHelp: !context.type.needHelp,
  }),
});
const toggleUnexpectedBehavior = assign({
  type: context => ({
    ...context.type,
    unexpectedBehavior: !context.type.unexpectedBehavior,
  }),
});
const toggleDocsIssue = assign({
  type: context => ({
    ...context.type,
    docsIssue: !context.type.docsIssue,
  }),
});
const toggleSomethingElse = assign({
  type: context => ({
    ...context.type,
    somethingElse: !context.type.somethingElse,
  }),
});

const commentState = {
  id: "comment",
  initial: "placeholder",
  type: "compound",
  states: {
    placeholder: {
      on: {
        SET_COMMENT_TEXT: {
          target: "showingText",
          actions: "setCommentText",
        },
      },
    },
    showingText: {
      on: {
        SET_COMMENT_TEXT: {
          actions: "setCommentText",
        },
      },
    },
  },
};
const setCommentText = (context, event) => {
  context.comment = event.text;
};

const screenshotState = {
  id: "screenshot",
  initial: "previewing",
  type: "compound",
  states: {
    hidden: {
      on: {
        TOGGLE_INCLUDE_SCREENSHOT: {
          target: "previewing",
          actions: "toggleIncludeScreenshot",
        },
        SET_SCREENSHOT: {
          actions: "setScreenshot",
        },
      },
    },
    previewing: {
      on: {
        TOGGLE_SCREENSHOT_ANNOTATOR: "annotating",
        TOGGLE_INCLUDE_SCREENSHOT: {
          target: "hidden",
          actions: "toggleIncludeScreenshot",
        },
      },
    },
    annotating: {
      on: {
        TOGGLE_SCREENSHOT_ANNOTATOR: "previewing",
        SAVE_SCREENSHOT_ANNOTATIONS: {
          target: "previewing",
          // actions: "saveScreenshotAnnotations",
        },
      },
    },
  },
};

const positiveRatingState = {
  id: "positiveRating",
  type: "parallel",
  states: {
    comment: commentState,
    screenshot: screenshotState,
  },
};
const negativeRatingState = {
  id: "negativeRating",
  type: "parallel",
  states: {
    types: feedbackTypesState,
    comment: commentState,
    screenshot: screenshotState,
  },
};

const feedbackWidgetState = {
  id: "feedbackWidget",
  initial: "hasNoRating",
  context: {
    includeScreenshot: true,
    screenshot: null,
    helpful: "",
    comment: "",
    type: {
      needHelp: false,
      unexpectedBehavior: false,
      docsIssue: false,
      somethingElse: false,
    },
  },
  on: {
    CLOSE_MODAL: "hasNoRating",
  },
  states: {
    hasNoRating: {
      on: {
        RATE_YES: {
          target: "hasRating",
          actions: "rateYes",
        },
        RATE_YES_BUT: {
          target: "hasRating",
          actions: "rateYesBut",
        },
        RATE_NO: {
          target: "hasRating",
          actions: "rateNo",
        },
      },
    },
    hasRating: {
      initial: "unknown",
      states: {
        unknown: {
          on: {
            "": [
              { target: "positive", cond: "isPositiveRating" },
              { target: "negative", cond: "isNegativeRating" },
            ],
          },
        },
        positive: positiveRatingState,
        negative: negativeRatingState,
      },
    },
  },
};
const toggleIncludeScreenshot = assign({
  includeScreenshot: (context, event) => !context.includeScreenshot,
});
const setScreenshot = assign({
  screenshot: (context, event) => event.screenshot,
});
// Context Updates
const rateYes = assign({ helpful: "yes" });
const rateYesBut = assign({ helpful: "yesbut" });
const rateNo = assign({ helpful: "no" });
// Guards
const isPositiveRating = (context, event) => {
  const positiveRatings = ["yes"];
  return positiveRatings.includes(context.helpful);
};
const isNegativeRating = (context, event) => {
  const negativeRatings = ["yesbut", "no"];
  return negativeRatings.includes(context.helpful);
};
const stateMachine = Machine(feedbackWidgetState, {
  actions: {
    rateYes,
    rateYesBut,
    rateNo,
    toggleIncludeScreenshot,
    setScreenshot,
    setCommentText,
    toggleNeedHelp,
    toggleUnexpectedBehavior,
    toggleDocsIssue,
    toggleSomethingElse,
  },
  guards: {
    isPositiveRating,
    isNegativeRating,
  },
});
export default stateMachine;

const WidgetContext = React.createContext();
export function useWidgetState() {
  const widget = React.useContext(WidgetContext);
  if (!widget) {
    throw new Error(
      "You can only call useWidgetState() inside of a WidgetProvider.",
    );
  }
  return widget;
}
export function WidgetProvider(props) {
  const [state, send] = useMachine(stateMachine);
  const widget = { state, send };
  return (
    <WidgetContext.Provider value={widget}>
      {props.children}
    </WidgetContext.Provider>
  );
}
