import React from "react";
import styled from "@emotion/styled";
import { AskingHelpfulView, RatingDetailView } from "./../views";
import Icon from "@leafygreen-ui/icon";
import { useWidgetState } from "./../stateMachine";

export default function FeedbackWidget() {
  const { state, send } = useWidgetState();
  const closeModal = () => send("CLOSE_MODAL");
  return (
    <Layout>
      <Card>
        <CardHeader>
          <h2>
            {state.matches("hasRating.positive") && "We're glad to hear that!"}
            {state.matches("hasRating.negative") && "Sorry to hear that."}
          </h2>
          <Icon
            glyph="X"
            size="large"
            onClick={() => {
              state.matches("hasNoRating") && closeModal();
              state.matches("hasRating") && closeModal();
            }}
          />
        </CardHeader>
        {state.matches("hasNoRating") && <AskingHelpfulView />}
        {state.matches("hasRating") && <RatingDetailView />}
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
  font-family: sans-serif;
`;
const Card = styled.div`
  border-radius: 4px;
  box-shadow: 0 16px 60px 0 rgba(86, 91, 115, 0.2);
  display: flex;
  flex-direction: column;
  padding: 24px;
  background: white;
  min-width: 420px;
`;
const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  & h2 {
    margin: 0 auto 0 0;
  }
`;
