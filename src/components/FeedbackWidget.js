import React from "react";
import styled from "@emotion/styled";
import { uiColors } from "@leafygreen-ui/palette";
import stateMachine from "./../stateMachine";
import { useMachine } from "@xstate/react";
import {
  AskingDomainView,
  AskingHelpfulView,
  RatingDetailView,
} from "./../views";

export default function FeedbackWidget() {
  const [state, send] = useMachine(stateMachine);
  const widget = { state, send };
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
  height: 200vh;
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
