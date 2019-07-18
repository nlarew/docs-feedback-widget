import React from "react";
import ReactDOM from "react-dom";
import FeedbackWidget from "./components/FeedbackWidget";
import { WidgetProvider } from "./stateMachine";
import { AskingHelpfulView } from "./views";

// import "./styles.css";

module.exports = {
  AskingHelpfulView
};
export default function Feedback() {
  return (
    <WidgetProvider>
      <FeedbackWidget />
    </WidgetProvider>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Feedback />, rootElement);
