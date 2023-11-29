import { IImageLibrary } from "../../libraries/IImageLibrary";
import { Color } from "../../utils/Color";

export function helloWorld(imageLibrary: IImageLibrary) {
  let pixels: Color[] = [];
  const HEIGHT = 256;
  const WIDTH = 256;

  for (let height = 0; height < HEIGHT; height++) {
    for (let width = 0; width < WIDTH; width++) {
      pixels.push(new Color(width / 255, height / 255, 0));
    }
  }

  imageLibrary.createBufferImage({
    pixels,
    width: WIDTH,
    height: HEIGHT,
    name: "chapter2/hello_world.png",
  });
}
