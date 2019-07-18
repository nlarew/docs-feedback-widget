import React, { useState, useEffect } from "react";
import { uiColors } from "@leafygreen-ui/palette";
import styled from "@emotion/styled";
import Toggle from "@leafygreen-ui/toggle";
// import Checkbox from "@leafygreen-ui/checkbox";
import Screenshot from "./../Screenshot";
// import CanvasDraw from "react-canvas-draw";
import Loader from "react-loader-spinner";
import { useWidgetState } from "./../stateMachine";

export default function ScreenshotWidget(props) {
  const { state, send } = useWidgetState();
  console.log("state", state);
  const { screenshot, includeScreenshot } = state.context;
  const [screenshotPreview, setScreenshotPreview] = useState();
  const isLoading = includeScreenshot && !screenshot;
  const toggleIncludeScreenshot = () => send("TOGGLE_INCLUDE_SCREENSHOT");
  useEffect(() => {
    const takeScreenshot = async () => {
      const ss = await Screenshot.ofElement("#root");
      // const resized = await ss.resize({ width: 356, height: 40 });
      const scaled = await ss.scaleDownToFit({ width: 356, height: 300 });
      send({ type: "SET_SCREENSHOT", screenshot: ss });
      setScreenshotPreview(scaled);
    };
    if (includeScreenshot) {
      takeScreenshot();
      return () => {
        send({ type: "SET_SCREENSHOT", screenshot: null });
        setScreenshotPreview(null);
      };
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
        <span>Include a screenshot of this page</span>
      </Prompt>
      <ScreenshotPreview image={screenshotPreview} isLoading={isLoading} />
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

const ScreenshotPreview = ({ isLoading, image }) => {
  const Container = styled.div`
    margin-block-start: 0.5em;
    width: 100%;
    background-color: ${uiColors.gray.light1};
    background-color: #d4d8d8;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: ${isLoading ? "300px" : "0px"};
    border-radius: 4px;
  `;
  return (
    <Container>
      {image ? (
        <img alt="screenshot" src={image.dataUrl} />
      ) : (
        <>
          <LoadingMessage>Generating Screenshot</LoadingMessage>
          <Loader type="ThreeDots" color={uiColors.white} height="60" />
        </>
      )}
    </Container>
  );
};
const LoadingMessage = styled.span`
  color: ${uiColors.white};
  font-size: 16px;
`;
