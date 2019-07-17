import React from "react";

export default function AskingDomainView({ widget: { state, send } }) {
  return (
    <div>
      <button onClick={() => send("ASK_HELPFUL")}>Ask Helpful</button>
    </div>
  );
}
