import React from "react";
import styled from "@emotion/styled";
import FeedbackStep from "./../components/FeedbackStep";

export default function RatingDetailView({ widget: { state, send } }) {
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
      <FeedbackStep number={1}>What was the problem?</FeedbackStep>
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
      <FeedbackStep number={2}>Please explain</FeedbackStep>
      <FeedbackCommentTextInput placeholder="Leave feedback here" />
      <FeedbackStep number={3}>Submit a screenshot?</FeedbackStep>
    </RatingDetailViewLayout>
  );
}
const RatingDetailViewLayout = styled.div`
  display: flex;
  flex-direction: column;
`;

const FeedbackTypeButtonGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 12px;
  margin-top: 12px;
`;
const FeedbackTypeToggleButton = styled.button`
  background: ${({ selected }) =>
    selected ? "rgba(19,170,82,1)" : "rgba(250,251,252,1)"};
`;
const FeedbackCommentTextInput = styled("textarea")`
  min-width: 100%;
  max-width: 100%;
  margin-top: 12px;
`;
