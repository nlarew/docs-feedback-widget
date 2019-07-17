import React from "react";
import ReactDOM from "react-dom";
import styled from "@emotion/styled";
import { useMachine } from "@xstate/react";
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
  initial: "askingDomain",
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

function AskingDomainView({ widget: { state, send } }) {
  return (
    <div>
      <button onClick={() => send("ASK_HELPFUL")}>Ask Helpful</button>
    </div>
  );
}
function AskingHelpfulView({ widget: { state, send } }) {
  return (
    <div>
      <button onClick={() => send("RATE_YES")}>YES</button>
      <button onClick={() => send("RATE_YES_BUT")}>YES, BUT</button>
      <button onClick={() => send("RATE_NO")}>NO</button>
    </div>
  );
}
function RatingDetailView({ widget: { state, send } }) {
  const { wasRatedHelpfulWithCaveat, wasRatedUnhelpful } = state.value;
  const {
    somethingWasMissing,
    somethingWasWrong,
    somethingWasOutOfDate,
    somethingWasConfusing,
  } = wasRatedHelpfulWithCaveat || wasRatedUnhelpful;
  const isSelected = value => value === "selected";
  return (
    <RatingDetailViewLayout>
      <FeedbackTypeButtonGrid>
        <FeedbackTypeToggleButton
          selected={isSelected(somethingWasMissing)}
          onClick={() => send("TOGGLE_SOMETHING_MISSING")}
        >
          Something Was Missing
        </FeedbackTypeToggleButton>
        <FeedbackTypeToggleButton
          selected={isSelected(somethingWasWrong)}
          onClick={() => send("TOGGLE_SOMETHING_WRONG")}
        >
          Something Was Wrong
        </FeedbackTypeToggleButton>
        <FeedbackTypeToggleButton
          selected={isSelected(somethingWasOutOfDate)}
          onClick={() => send("TOGGLE_SOMETHING_OUT_OF_DATE")}
        >
          Something Was Out-of-Date
        </FeedbackTypeToggleButton>
        <FeedbackTypeToggleButton
          selected={isSelected(somethingWasConfusing)}
          onClick={() => send("TOGGLE_SOMETHING_CONFUSING")}
        >
          Something Was Confusing
        </FeedbackTypeToggleButton>
      </FeedbackTypeButtonGrid>
      <FeedbackCommentTextInput placeholder="Leave feedback here" />
    </RatingDetailViewLayout>
  );
}
const RatingDetailViewLayout = styled.div`
  display: flex;
  flex-direction: column;
`;

function FeedbackWidget() {
  const [state, send] = useMachine(Machine(feedbackWidgetState));
  const widget = { state, send };
  console.log("state", state);

  return (
    <Layout>
      <Card>
        <CardHeader>
          <h2>Leave Feedback</h2>
        </CardHeader>
        <CardBody>
          {state.matches("askingDomain") && (
            <AskingDomainView widget={widget} />
          )}
          {state.matches("askingHelpful") && (
            <AskingHelpfulView widget={widget} />
          )}
          {state.matches("wasRatedHelpfulWithCaveat") && (
            <RatingDetailView widget={widget} />
          )}
          {state.matches("wasRatedUnhelpful") && (
            <RatingDetailView widget={widget} />
          )}
        </CardBody>
      </Card>
    </Layout>
  );
}
const Layout = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: lightgrey;
`;
const Card = styled.div`
  border-radius: 4px;
  box-shadow: 0 16px 60px 0 rgba(86, 91, 115, 0.2);
  display: flex;
  flex-direction: column;
  width: 380px;
`;
const CardHeader = styled.div`
  background-color: #13aa52;
  min-height: 40px;
  padding: 0 12px;
  & h2 {
    margin-block-start: 0.7em;
    margin-block-end: 0.7em;
  }
`;
const CardBody = styled.div`
  height: 100%;
  padding: 8px 12px 12px 12px;
  background: white;
`;
const FeedbackTypeButtonGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 12px;
`;
const FeedbackTypeToggleButton = styled.button`
  background: ${({ selected }) =>
    selected ? "rgba(19,170,82,1)" : "rgba(250,251,252,1)"};
`;
const FeedbackCommentTextInput = styled("textarea")`
  min-width: 100%;
  max-width: 100%;
  margin: 4px 0;
`;

const rootElement = document.getElementById("root");
ReactDOM.render(<FeedbackWidget />, rootElement);
