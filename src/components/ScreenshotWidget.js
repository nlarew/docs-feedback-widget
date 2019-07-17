import React, { useEffect } from "react";
import { uiColors } from "@leafygreen-ui/palette";
import styled from "@emotion/styled";
import Toggle from "@leafygreen-ui/toggle";
import Screenshot from "./../Screenshot";

export default function ScreenshotWidget({ widget: { state, send } }) {
  console.log("state", state);
  const { screenshot, includeScreenshot } = state.context;
  const isLoading = includeScreenshot && !screenshot;
  const toggleIncludeScreenshot = () => send("TOGGLE_INCLUDE_SCREENSHOT");
  useEffect(() => {
    const takeScreenshot = async () => {
      const ss = await Screenshot.ofElement("#root");
      // const resized = await ss.resize({ width: 356, height: 40 });
      const scaled = await ss.scaleDownToFit({ width: 356, height: 300 });
      send({ type: "SET_SCREENSHOT", screenshot: scaled });
    };
    if (includeScreenshot) {
      takeScreenshot();
      return () => send({ type: "SET_SCREENSHOT", screenshot: null });
    }
  }, [includeScreenshot, send]);
  return (
    <Layout>
      <Prompt>
        <Toggle
          size="small"
          onChange={toggleIncludeScreenshot}
          checked={includeScreenshot}
        />
        <span>Include a Screenshot</span>
      </Prompt>
      {screenshot && (
        <ScreenshotViewer>
          <img alt="screenshot" src={screenshot.dataUrl} />
        </ScreenshotViewer>
      )}
    </Layout>
  );
}
const Layout = styled.div`
  display: flex;
  flex-direction: column;
  margin-block-start: 0.5em;
  margin-block-end: 0.5em;
`;
const Prompt = styled.div`
  display: flex;
  align-items: center;
  & span {
    margin-left: 12px;
  }
`;
const ScreenshotViewer = styled.div`
  margin-block-start: 0.5em;
  width: 100%;
  background-color: ${uiColors.black};
  display: flex;
  flex-direction: column;
  align-items: center;
`;
