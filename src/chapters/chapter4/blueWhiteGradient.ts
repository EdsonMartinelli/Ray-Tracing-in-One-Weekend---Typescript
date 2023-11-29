import { IImageLibrary } from "../../libraries/IImageLibrary";
import { Color } from "../../utils/Color";
import { Point } from "../../utils/Point";
import { Ray } from "../../utils/Ray";
import { Vec3 } from "../../utils/Vec3";

function createAxisVectors(viewportWidth: number, viewportHeight: number) {
  return {
    horizontal: new Vec3(viewportWidth, 0, 0),
    vertical: new Vec3(0, -viewportHeight, 0),
  };
}

function createTopLeftCorner(
  horizontal: Vec3,
  vertical: Vec3,
  focalLength: number
) {
  const halfHorizontal = horizontal.scalarDiv(2);
  const halfVertical = vertical.scalarDiv(2);
  const focalVec = new Vec3(0, 0, -focalLength);

  return Vec3.sum(
    halfHorizontal.scalarMult(-1),
    halfVertical.scalarMult(-1),
    focalVec
  );
}

export function blueWhiteGradient(imageLibrary: IImageLibrary) {
  const pixels: Color[] = [];
  const aspectRatio = 16 / 9;

  const imageWidth = 400;
  const imageHeight = Math.round(imageWidth / aspectRatio);

  const cameraOrigin = new Point(0, 0, 0);
  const viewportHeight = 2;

  const viewportWidth = aspectRatio * viewportHeight;
  const { horizontal, vertical } = createAxisVectors(
    viewportWidth,
    viewportHeight
  );
  const topLeftCorner = createTopLeftCorner(horizontal, vertical, 1);

  for (let y = 0; y < imageHeight; y++) {
    for (let x = 0; x < imageWidth; x++) {
      const u = (x + 0.5) / imageWidth;
      const v = (y + 0.5) / imageHeight;
      const horizontalViewportPercent = horizontal.scalarMult(u);
      const verticalViewportPercent = vertical.scalarMult(v);

      const rayPixel = Vec3.sum(
        topLeftCorner,
        horizontalViewportPercent,
        verticalViewportPercent
      );

      const color = rayColor(
        new Ray({
          origin: cameraOrigin,
          direction: rayPixel,
        })
      );
      pixels.push(color);
    }
  }

  function rayColor(ray: Ray): Color {
    const unitDirection = ray.direction.unitVector();
    /*
      Ao obter o vetor unitário, a coordenada y está entre -1 e 1, pois, dependendo
      do seu valor a divisão pelo tamanho do vetor poderá resultar em uma número negativo.
      Por isso, é feita a soma com 1, mantendo seu valor entre 0 e 2 e posteriormente
      dividindo esse valor pro 2 para mante-lo entre 0 e 1.
    */
    const t = 0.5 * (unitDirection.y + 1);
    const startColor = Color.white().scalarMult(1 - t);
    const endColor = Color.skyBlue().scalarMult(t);
    return Color.sum(startColor, endColor);
  }

  imageLibrary.createBufferImage({
    pixels,
    width: imageWidth,
    height: imageHeight,
    name: "chapter4/blue_white_gradient.png",
  });
}
