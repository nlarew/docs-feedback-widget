import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import Toggle from "@leafygreen-ui/toggle";
import Screenshot from "./../Screenshot";

export default function ScreenshotWidget(props) {
  const [screenshot, setScreenshot] = useState();
  const takeScreenshot = async () => {
    const ss = await Screenshot.ofElement("#root");
    // const resized = await ss.resize({ width: 356, height: 40 });
    // const scaled = await ss.scale(0.2);
    const scaled = await ss.scaleDownToFit({ width: 356, height: 900 });
    setScreenshot(scaled);
  };
  const [includeScreenshot, setIncludeScreenshot] = useState(false);
  const toggleIncludeScreenshot = () => {
    setIncludeScreenshot(!includeScreenshot);
  };
  useEffect(() => {
    if (includeScreenshot) {
      takeScreenshot();
      return () => setScreenshot(null);
    }
  }, [includeScreenshot]);
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
        <div>
          <img alt="screenshot" src={screenshot.dataUrl} />
        </div>
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
