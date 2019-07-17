import React from "react";

export default function AskingHelpfulView({ widget: { state, send } }) {
  return (
    <div>
      <button onClick={() => send("RATE_YES")}>YES</button>
      <button onClick={() => send("RATE_YES_BUT")}>YES, BUT</button>
      <button onClick={() => send("RATE_NO")}>NO</button>
    </div>
  );
}
