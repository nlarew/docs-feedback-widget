import React from "react";
import ReactDOM from "react-dom";
import FeedbackWidget from "./components/FeedbackWidget";
import { WidgetProvider } from "./stateMachine";
import { AskingHelpful } from "./views";

// import "./styles.css";

exports = {
  FeedbackPrompt: AskingHelpful,
};
export default function Feedback() {
  return (
    <WidgetProvider>
      <FeedbackWidget />
    </WidgetProvider>
  );
}

// const rootElement = document.getElementById("root");
// ReactDOM.render(<Feedback />, rootElement);
