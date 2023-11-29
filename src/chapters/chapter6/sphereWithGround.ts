import { HittableList } from "../../entities/HittableList";
import { Interval } from "../../utils/Interval";
import { Sphere } from "../../entities/objects/Sphere";
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

export function sphereWithGround(imageLibrary: IImageLibrary) {
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

  const world = new HittableList();
  world.add(new Sphere(new Point(0, 0, -1), 0.5));
  world.add(new Sphere(new Point(0, -100.5, -1), 100));

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
    const hit = world.hit(ray, new Interval(0, Infinity));
    if (hit != null) {
      return new Color(
        hit.normal.x + 1,
        hit.normal.y + 1,
        hit.normal.z + 1
      ).scalarMult(0.5);
    }

    const unitDirection = ray.direction.unitVector();
    const t = 0.5 * (unitDirection.y + 1);
    const startColor = Color.white().scalarMult(1 - t);
    const endColor = Color.skyBlue().scalarMult(t);
    return Color.sum(startColor, endColor);
  }

  imageLibrary.createBufferImage({
    pixels,
    width: imageWidth,
    height: imageHeight,
    name: "chapter6/sphere_with_ground.png",
  });
}
