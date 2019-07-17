import { Machine } from "xstate";

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

const feedbackWidgetState = {
  id: "feedbackWidget",
  // initial: "askingDomain",
  initial: "wasRatedUnhelpful",
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
    },
    wasRatedUnhelpful: {
      ...feedbackTypesState,
    },
  },
};

export default Machine(feedbackWidgetState);
