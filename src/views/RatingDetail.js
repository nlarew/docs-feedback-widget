import React from "react";
import styled from "@emotion/styled";
import ScreenshotWidget from "./../components/ScreenshotWidget";
import Button from "@leafygreen-ui/button";

export default function RatingDetailView({ widget: { state, send } }) {
  const widget = { state, send };
  const { wasRatedHelpfulWithCaveat, wasRatedUnhelpful } = state.value;
  const {
    somethingWasMissing,
    somethingWasWrong,
    somethingWasOutOfDate,
    somethingWasConfusing,
  } = wasRatedHelpfulWithCaveat || wasRatedUnhelpful;
  const isSelected = value => value === "selected";
  return (
    <Layout>
      <Header>What was the problem?</Header>
      <FeedbackTypeButtonGrid>
        <FeedbackTypeToggleButton
          isSelected={isSelected(somethingWasMissing)}
          onClick={() => send("TOGGLE_SOMETHING_MISSING")}
        >
          Something Was Missing
        </FeedbackTypeToggleButton>
        <FeedbackTypeToggleButton
          isSelected={isSelected(somethingWasWrong)}
          onClick={() => send("TOGGLE_SOMETHING_WRONG")}
        >
          Something Was Wrong
        </FeedbackTypeToggleButton>
        <FeedbackTypeToggleButton
          isSelected={isSelected(somethingWasOutOfDate)}
          onClick={() => send("TOGGLE_SOMETHING_OUT_OF_DATE")}
        >
          Something Was Out-of-Date
        </FeedbackTypeToggleButton>
        <FeedbackTypeToggleButton
          isSelected={isSelected(somethingWasConfusing)}
          onClick={() => send("TOGGLE_SOMETHING_CONFUSING")}
        >
          Something Was Confusing
        </FeedbackTypeToggleButton>
      </FeedbackTypeButtonGrid>
      <FeedbackCommentTextInput placeholder="Leave feedback here" />
      <ScreenshotWidget widget={widget} />
      <Button variant="primary">Submit Feedback</Button>
    </Layout>
  );
}
const Layout = styled.div`
  display: flex;
  flex-direction: column;
`;

const FeedbackTypeButtonGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 12px;
  margin-top: 12px;
  margin-block-start: 0.5em;
  margin-block-end: 0.5em;
`;
const FeedbackTypeToggleButton = styled.button`
  background: ${({ isSelected }) =>
    isSelected ? "rgba(19,170,82,1)" : "rgba(250,251,252,1)"};
`;
const FeedbackCommentTextInput = styled("textarea")`
  min-width: 100%;
  max-width: 100%;
  margin-top: 12px;
  margin-block-start: 0.5em;
  margin-block-end: 0.5em;
`;
const Header = styled.h3`
  margin-block-start: 0.5em;
  margin-block-end: 0.35em;
`;
