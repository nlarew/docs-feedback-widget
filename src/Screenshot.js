import domtoimage from "dom-to-image";

export default class Screenshot {
  constructor({ image, format }) {
    this.format = format;
    this.dataUrl = image;
  }

  static async ofElement(selector) {
    // e.g. Screenshot.ofElement("#App")
    const element = document.querySelector(selector);
    const image = await domtoimage.toPng(element);
    return new Screenshot({ image, format: "png" });
  }

  toCanvas() {}
  crop() {}
  resize() {}
}
