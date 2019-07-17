import React from "react";
import ReactDOM from "react-dom";
import styled from "@emotion/styled";
import domtoimage from "dom-to-image";

import "./styles.css";

function App() {
  const appRef = React.useRef();
  const canvasRef = React.useRef();
  const [imageSrc, setImageSrc] = React.useState(null);

  function generateScreenshot() {
    return domtoimage
      .toPng(document.getElementById("App"))
      .catch(function(error) {
        console.error("oops, something went wrong!", error);
      });
  }

  const takeScreenshot = async () => {
    if (appRef.current) {
      console.log("taking screenshot", canvasRef);
      const dataUrl = await generateScreenshot();
      setImageSrc(dataUrl);
    } else {
      console.log(`can't take screenshot`);
    }
  };

  return (
    <div>
      <Layout id="App" className="App" ref={appRef}>
        <h1>Hello CodeSandbox</h1>
        <h2>Start editing to see some magic happen!</h2>
        <button onClick={takeScreenshot}>Take Screenshot</button>
      </Layout>
      {imageSrc && <img alt="screenshot" src={imageSrc} />}
    </div>
  );
}
const Layout = styled.div`
  font-family: sans-serif;
  text-align: center;
  background-color: red;
`;
const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
