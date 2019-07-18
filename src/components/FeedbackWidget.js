import React from "react";
import styled from "@emotion/styled";
import { AskingHelpfulView, RatingDetailView } from "./../views";
import Icon from "@leafygreen-ui/icon";
import { useWidgetState } from "./../stateMachine";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: 0,
  },
};

export default function FeedbackWidget() {
  const { state, send } = useWidgetState();
  console.log("state", state);
  const closeModal = () => send("CLOSE_MODAL");
  return (
    <Layout>
      {!state.context.modal.isOpen && <AskingHelpfulView />}
      <Modal
        contentLabel="Example Modal"
        appElement={document.getElementById("root")}
        isOpen={state.context.modal.isOpen}
        // onAfterOpen={this.afterOpenModal}
        // onRequestClose={this.closeModal}
        style={customStyles}
      >
        <Card>
          <CardHeader>
            <h2>
              {state.matches("hasRating.positive") &&
                "We're glad to hear that!"}
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
          <CardBody>
            {state.matches("hasNoRating") && <AskingHelpfulView />}
            {state.matches("hasRating") && <RatingDetailView />}
          </CardBody>
        </Card>
      </Modal>
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
`;
const Card = styled.div`
  border-radius: 4px;
  box-shadow: 0 16px 60px 0 rgba(86, 91, 115, 0.2);
  display: flex;
  flex-direction: column;
  padding: 24px;
  background: white;
  min-width: 420px;
  font-family: sans-serif;
`;
const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  & h2 {
    margin: 0 auto 0 0;
  }
`;
const CardBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
