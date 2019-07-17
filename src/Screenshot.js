import domtoimage from "dom-to-image";

export default class Screenshot {
  constructor({ image, format }) {
    this.format = format;
    this.dataUrl = image;
    this.imageEl = null;
  }

  static async ofElement(selector) {
    // e.g. Screenshot.ofElement("#App")
    const element = document.querySelector(selector);
    const image = await domtoimage.toPng(element);
    return new Screenshot({ image, format: "png" });
  }
  // Factory Methods
  toImage() {
    return new Promise((resolve, reject) => {
      if (this.imageEl) {
        resolve(this.imageEl);
      } else {
        const img = new Image();
        img.src = this.dataUrl;
        img.onerror = reject;
        img.onload = () => {
          this.imageEl = img;
          resolve(img);
        };
      }
    });
  }
  toCanvasElement({ width, height } = {}) {
    console.log(`converting to canvas of size: ${width}x${height}`);
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");
    if (width) ctx.canvas.width = width;
    if (height) ctx.canvas.height = height;
    return [canvas, ctx];
  }

  // Modifier Methods
  async crop() {}
  async scale(multiplier) {
    const image = await this.toImage();
    const resizedWidth = image.width * multiplier;
    const resizedHeight = image.height * multiplier;
    return await this.resize({ width: resizedWidth, height: resizedHeight });
  }
  async scaleDownToFit({ width, height }) {
    const image = await this.toImage();
    width = width || image.width;
    height = height || image.height;
    const scalingFactor = Math.min(width / image.width, height / image.height);
    return this.scale(scalingFactor);
  }
  async resize({ width, height }) {
    const image = await this.toImage();
    width = width || image.width;
    height = height || image.height;
    const [canvas, ctx] = this.toCanvasElement({ width, height });
    ctx.drawImage(image, 0, 0, width, height);
    return new Screenshot({
      image: canvas.toDataURL("image/png"),
      format: "png",
    });
  }
}
