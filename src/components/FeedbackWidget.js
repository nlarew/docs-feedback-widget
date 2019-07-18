import React from "react";
import styled from "@emotion/styled";
import { uiColors } from "@leafygreen-ui/palette";
import stateMachine from "./../stateMachine";
import { useMachine } from "@xstate/react";
import {
  AskingDomainView,
  AskingHelpfulView,
  NegativeRatingView,
} from "./../views";

export default function FeedbackWidget() {
  const [state, send] = useMachine(stateMachine);
  const widget = { state, send };
  console.log(state);
  return (
    <Layout>
      <Card>
        <CardHeader>
          <h2>Leave Feedback</h2>
        </CardHeader>
        <CardBody>
          {state.matches("hasNoRating") && (
            <AskingHelpfulView widget={widget} />
          )}
          {state.matches("hasRating.positive") && (
            <NegativeRatingView rating="positive" widget={widget} />
          )}
          {state.matches("hasRating.negative") && (
            <NegativeRatingView rating="negative" widget={widget} />
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
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  background: lightgrey;
  transition: 10000ms;
`;
const Card = styled.div`
  border-radius: 4px;
  box-shadow: 0 16px 60px 0 rgba(86, 91, 115, 0.2);
  display: flex;
  flex-direction: column;
  width: 380px;
`;
const CardHeader = styled.div`
  color: white;
  background-color: ${uiColors.green.base};
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
