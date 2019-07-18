import React from "react";
import styled from "@emotion/styled";
import ScreenshotWidget from "./../components/ScreenshotWidget";
import Button from "@leafygreen-ui/button";

export default function NegativeRatingView({
  rating,
  widget: { state, send },
}) {
  const widget = { state, send };
  const {
    needHelp,
    unexpectedBehavior,
    docsIssue,
    somethingElse,
  } = state.value.hasRating.negative.types;
  const isSelected = value => value === "selected";
  return (
    <Layout>
      <Header>What Was The Problem?</Header>
      <FeedbackTypeButtonGrid>
        <FeedbackTypeToggleButton
          isSelected={isSelected(needHelp)}
          onClick={() => send("TOGGLE_NEED_HELP")}
        >
          I still need help
        </FeedbackTypeToggleButton>
        <FeedbackTypeToggleButton
          isSelected={isSelected(unexpectedBehavior)}
          onClick={() => send("TOGGLE_UNEXPECTED_BEHAVIOR")}
        >
          I'm seeing unexpected behavior
        </FeedbackTypeToggleButton>
        <FeedbackTypeToggleButton
          isSelected={isSelected(docsIssue)}
          onClick={() => send("TOGGLE_DOCS_ISSUE")}
        >
          There was an issue with the docs
        </FeedbackTypeToggleButton>
        <FeedbackTypeToggleButton
          isSelected={isSelected(somethingElse)}
          onClick={() => send("TOGGLE_SOMETHING_ELSE")}
        >
          Something else
        </FeedbackTypeToggleButton>
      </FeedbackTypeButtonGrid>
      <Header>Tell Us More</Header>
      <FeedbackCommentTextInput
        placeholder="Leave feedback here"
        value={state.context.comment}
        onChange={e => send({ type: "SET_COMMENT_TEXT", text: e.target.value })}
      />
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
  padding: 12px;
`;
const FeedbackCommentTextInput = styled("textarea")`
  resize: none;
  box-sizing: border-box;
  height: 140px;
  padding: 14px;
  min-width: 100%;
  max-width: 100%;
  margin-top: 12px;
  margin-block-start: 0.5em;
  font-size: 16px;
`;
const Header = styled.h3`
  margin-block-start: 0.5em;
  margin-block-end: 0.35em;
`;
