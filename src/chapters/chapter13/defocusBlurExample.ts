import { HittableList } from "../../entities/HittableList";
import { Sphere } from "../../entities/objects/Sphere";
import { IImageLibrary } from "../../libraries/IImageLibrary";
import { Point } from "../../utils/Point";
import { Camera } from "../../camera/Camera";
import { Lambertian } from "../../materials/Lambertian";
import { Color } from "../../utils/Color";
import { Metal } from "../../materials/Metal";
import { Vec3 } from "../../utils/Vec3";
import { randomMinMax } from "../../utils/Support";

export function defocusBlurExample(imageLibrary: IImageLibrary) {
  const IMAGES_SAMPLE = 10;

  const imageWidth = 400;
  const samplePerPixel = 50;
  const aspectRatio = 16 / 9;
  const vfov = 90;

  const defocusAngle = Math.PI / 18;
  const imageHeight = Math.round(imageWidth / aspectRatio);

  const viewportHeight = 2;
  const viewportWidth = 2 * aspectRatio;

  const horizontalUnit = viewportWidth / imageWidth;
  const verticalUnit = viewportHeight / imageHeight;

  const defocusShift = Math.tan(defocusAngle);

  for (let i = 0; i < IMAGES_SAMPLE; i++) {
    let xShift = 0;
    let yShift = 0;
    if (i != 0) {
      xShift = randomMinMax(-1, 1) * defocusShift;
      yShift = randomMinMax(-1, 1) * defocusShift;
    }
    const lookFrom = new Point(xShift, yShift, 0);
    const lookAt = new Point(xShift, yShift, -1);
    const vup = new Vec3(0, 1, 0);

    const camera = new Camera({
      imageWidth,
      samplePerPixel,
      aspectRatio,
      vfov,
      lookFrom,
      lookAt,
      vup,
    });
    const world = new HittableList();

    const materialGround = new Lambertian(new Color(0.8, 0.8, 0));
    const materialCenter = new Lambertian(new Color(0.1, 0.2, 0.5));
    const materialLeft = new Metal(new Color(0.8, 0.8, 0.8), 0);
    const materialRight = new Metal(new Color(0.8, 0.6, 0.2), 0);

    world.add(new Sphere(new Point(0, -100.5, -1), 100, materialGround));
    world.add(new Sphere(new Point(0, 0, -1), 0.5, materialCenter));
    world.add(new Sphere(new Point(-1, 0, -1), 0.5, materialLeft));
    world.add(new Sphere(new Point(1, 0, -1), 0.5, materialRight));

    const xPixelShift = Math.round(xShift / horizontalUnit);
    const yPixelShift = Math.round(yShift / verticalUnit);
    const label = `defocusBlurExample/x${xPixelShift}y${yPixelShift}.png`;

    camera.render(imageLibrary, world, label);
  }
}
