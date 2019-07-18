import React from "react";
import styled from "@emotion/styled";
import { useWidgetState } from "./../stateMachine";

export default function AskingHelpfulView(props) {
  const { state, send } = useWidgetState();
  return (
    <Layout>
      <Heading>Was this page helpful?</Heading>
      <ButtonGroup>
        <RatingButton onClick={() => send("RATE_YES")}>YES</RatingButton>
        <RatingButton onClick={() => send("RATE_YES_BUT")}>
          YES, BUT
        </RatingButton>
        <RatingButton onClick={() => send("RATE_NO")}>NO</RatingButton>
      </ButtonGroup>
    </Layout>
  );
}
const RatingButton = styled.button`
  background-image: none;
  text-align: center;
  padding: 6px;
  border-radius: 4px;
`;
const Layout = styled.div`
  width: 360px;
  display: flex;
  flex-direction: column;
  background: white;
  padding: 12px;
`;
const Heading = styled.h2`
  width: 100%;
  font-weight: lighter;
  text-align: center;
  margin: 0;
`;
const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-top: 1em;

  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 1em;
`;
