import React from "react";
import ReactDOM from "react-dom";
import html2canvas from "html2canvas";
import * as rasterizeHTML from "rasterizehtml";

import "./styles.css";

function nodeToString(node) {
  var tmpNode = document.createElement("div");
  tmpNode.appendChild(node.cloneNode(true));
  var str = tmpNode.innerHTML;
  tmpNode = node = null; // prevent memory leaks in IE
  return str;
}

function App() {
  const appRef = React.useRef();
  const [state, setState] = React.useState(0);
  const [imageData, setImageData] = React.useState(null);

  async function generateScreenshot() {
    const rasterized = await rasterizeHTML.drawHTML(
      nodeToString(appRef.current),
    );
    const tempCanvas = Object.assign(document.createElement("canvas"), {
      width: window.innerWidth,
      height: window.innerHeight,
      // width: 320, // window.innerWidth
      // height: 320, // window.innerHeight
      // tempCanvas.id: "tempCanvas",
    });
    tempCanvas.getContext("2d").drawImage(rasterized.image, 0, 0);
    var imgDataUrl = tempCanvas.toDataURL("image/png");
    return imgDataUrl;
  }

  React.useEffect(() => {
    if (appRef.current) {
      generateScreenshot().then(imgDataUrl => {
        if (imgDataUrl !== imageData) setImageData(imgDataUrl);
      });
    } else {
      setState(state => state + 1);
    }
  });
  return (
    <>
      <div className="App" ref={appRef}>
        <h1>Hello CodeSandbox</h1>
        <h2>Start editing to see some magic happen!</h2>
      </div>
      {imageData && <img alt="screenshot" id="output" src={imageData} />}
    </>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
