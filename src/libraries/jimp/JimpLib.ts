import Jimp from "jimp";
import {
  ICreateBufferImage,
  ICreateVoidImage,
  IImageLibrary,
} from "../IImageLibrary";

export class JimpLib implements IImageLibrary {
  createVoidImage({ color, width, height, name }: ICreateVoidImage): void {
    new Jimp(width, height, color, (error: any, image: any) => {
      if (error != null) {
        console.log(error);
        return;
      }

      image.write(`src/images/${name}`);
    });
  }

  createBufferImage({
    pixels,
    width,
    height,
    name,
    samplePerPixel = 1,
  }: ICreateBufferImage): void {
    const arrayPixels: number[] = [];
    const scale = 1 / samplePerPixel;
    for (let i = 0; i < pixels.length; i++) {
      const r = this.normalizeColor(pixels[i].x * scale);
      const g = this.normalizeColor(pixels[i].y * scale);
      const b = this.normalizeColor(pixels[i].z * scale);
      arrayPixels.push(r);
      arrayPixels.push(g);
      arrayPixels.push(b);
      arrayPixels.push(255);
    }

    const data = Buffer.from(arrayPixels);

    new Jimp({ data, width, height }, (error: any, image: Jimp) => {
      if (error != null) {
        console.log(error);
        return;
      }
      // console.log(Jimp.intToRGBA(image.getPixelColor(200, 113)));
      image.write(`outputs/${name}`);
    });
  }

  private normalizeColor(value: number): number {
    if (value < 0) throw new Error("Color is invalid");
    return Math.round((255 * this.linearToGamma(value)) % 256);
  }

  private linearToGamma(value: number): number {
    return Math.sqrt(value);
    //return value;
  }
}
