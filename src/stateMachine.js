import { Machine, assign, send } from "xstate";

const feedbackStateForType = (feedbackType, toggleActionName) => ({
  id: feedbackType,
  initial: "notSelected",
  states: {
    notSelected: {
      on: { [toggleActionName]: "selected" },
    },
    selected: {
      on: { [toggleActionName]: "notSelected" },
    },
  },
});

const feedbackTypesState = {
  id: "feedbackTypes",
  type: "parallel",
  states: {
    somethingWasMissing: feedbackStateForType(
      "somethingWasMissing",
      "TOGGLE_SOMETHING_MISSING",
    ),
    somethingWasWrong: feedbackStateForType(
      "somethingWasWrong",
      "TOGGLE_SOMETHING_WRONG",
    ),
    somethingWasOutOfDate: feedbackStateForType(
      "somethingWasOutOfDate",
      "TOGGLE_SOMETHING_OUT_OF_DATE",
    ),
    somethingWasConfusing: feedbackStateForType(
      "somethingWasConfusing",
      "TOGGLE_SOMETHING_CONFUSING",
    ),
  },
};

const screenshotEventHandler = {
  on: {
    TOGGLE_INCLUDE_SCREENSHOT: {
      actions: "toggleIncludeScreenshot",
    },
    SET_SCREENSHOT: {
      actions: "setScreenshot",
    },
  },
};
const feedbackWidgetState = {
  id: "feedbackWidget",
  initial: "wasRatedUnhelpful",
  context: {
    includeScreenshot: true,
    screenshot: null,
  },
  states: {
    askingDomain: {
      on: { ASK_HELPFUL: "askingHelpful" },
    },
    askingHelpful: {
      on: {
        RATE_YES: "wasRatedHelpful",
        RATE_YES_BUT: "wasRatedHelpfulWithCaveat",
        RATE_NO: "wasRatedUnhelpful",
      },
    },
    wasRatedHelpful: {},
    wasRatedHelpfulWithCaveat: {
      ...feedbackTypesState,
      ...screenshotEventHandler,
    },
    wasRatedUnhelpful: {
      ...feedbackTypesState,
      ...screenshotEventHandler,
    },
  },
};
const toggleIncludeScreenshot = assign({
  includeScreenshot: (context, event) => !context.includeScreenshot,
});
const setScreenshot = assign({
  screenshot: (context, event) => event.screenshot,
});

export default Machine(feedbackWidgetState, {
  actions: { toggleIncludeScreenshot, setScreenshot },
  guards: {},
});
