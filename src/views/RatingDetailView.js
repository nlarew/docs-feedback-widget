import React from "react";
import styled from "@emotion/styled";
import ScreenshotWidget from "./../components/ScreenshotWidget";
import Button from "@leafygreen-ui/button";
import { uiColors } from "@leafygreen-ui/palette";
import Icon from "@leafygreen-ui/icon";
import { useWidgetState } from "./../stateMachine";
import CommentTextArea from "./../components/CommentTextArea";

export default function RatingDetailView(props) {
  const { state, send } = useWidgetState();
  return (
    <Layout>
      {state.matches("hasRating.positive") && (
        <>
          <CommentTextArea
            placeholder="Tell us more..."
            value={state.context.comment}
            onChange={e =>
              send({ type: "SET_COMMENT_TEXT", text: e.target.value })
            }
          />
          <ScreenshotWidget />
          <Footer>
            <span>
              Need support? Visit our{" "}
              <a href="https://support.mongodb.com/welcome">help center</a>.
            </span>
            <Button variant="primary">Submit</Button>
          </Footer>
        </>
      )}
      {state.matches("hasRating.negative") && (
        <>
          <Header>What seems to be the issue?</Header>
          <FeedbackTypeSection />
          <Header>Help us improve by telling us more</Header>
          <CommentTextArea
            placeholder="Please tell us about the issue(s) that you encountered here. Try to include specific details to help us improve our documentation."
            value={state.context.comment}
            onChange={e =>
              send({ type: "SET_COMMENT_TEXT", text: e.target.value })
            }
          />
          <ScreenshotWidget />
          <Footer>
            <span>
              Need support? Visit our{" "}
              <a href="https://support.mongodb.com/welcome">help center</a>.
            </span>
            <Button variant="primary">Submit</Button>
          </Footer>
        </>
      )}
    </Layout>
  );
}
const Layout = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const Header = styled.h3`
  margin-block-start: 0.5em;
  margin-block-end: 0.35em;
  font-weight: lighter;
`;
const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

//
const FeedbackTypeButtonGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 12px;
  margin-top: 12px;
  margin-block-start: 0.5em;
  margin-block-end: 0.5em;
`;
const FeedbackTypeToggleButton = styled.button`
  border-radius: 4px;
  padding: 12px;
  background-image: none;
  background: ${({ isSelected }) =>
    isSelected ? uiColors.green.light2 : uiColors.white};
  box-shadow: ${({ isSelected }) =>
    isSelected
      ? `0 0 0 2px ${uiColors.green.base}`
      : `0 0 0 1px rgba(0, 0, 0, 0.5)`};
`;
const FeedbackTypeSection = props => {
  const { state, send } = useWidgetState();
  const {
    needHelp,
    unexpectedBehavior,
    docsIssue,
    somethingElse,
  } = state.value.hasRating.negative.types;
  const isSelected = value => value === "selected";
  return (
    <FeedbackTypeButtonGrid>
      <FeedbackTypeToggleButton
        isSelected={isSelected(needHelp)}
        onClick={() => send("TOGGLE_NEED_HELP")}
      >
        This page wasn't what I expected
      </FeedbackTypeToggleButton>
      <FeedbackTypeToggleButton
        isSelected={isSelected(unexpectedBehavior)}
        onClick={() => send("TOGGLE_UNEXPECTED_BEHAVIOR")}
      >
        I'm having trouble using the product
      </FeedbackTypeToggleButton>
      <FeedbackTypeToggleButton
        isSelected={isSelected(docsIssue)}
        onClick={() => send("TOGGLE_DOCS_ISSUE")}
      >
        This page is wrong or unclear
      </FeedbackTypeToggleButton>
      <FeedbackTypeToggleButton
        isSelected={isSelected(somethingElse)}
        onClick={() => send("TOGGLE_SOMETHING_ELSE")}
      >
        Something else
      </FeedbackTypeToggleButton>
    </FeedbackTypeButtonGrid>
  );
};
