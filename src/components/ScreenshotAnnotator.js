import React, { useEffect } from "react";
import styled from "@emotion/styled";
import { uiColors } from "@leafygreen-ui/palette";
import Screenshot from "./../Screenshot";
import Modal from "react-modal";

export default function ScreenshotAnnotator(props) {
  return (
    <Modal
      isOpen={this.state.modalIsOpen}
      onAfterOpen={this.afterOpenModal}
      onRequestClose={this.closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <h2 ref={subtitle => (this.subtitle = subtitle)}>Hello</h2>
      <button onClick={this.closeModal}>close</button>
      <div>I am a modal</div>
      <form>
        <input />
        <button>tab navigation</button>
        <button>stays</button>
        <button>inside</button>
        <button>the modal</button>
      </form>
    </Modal>
  );
}
