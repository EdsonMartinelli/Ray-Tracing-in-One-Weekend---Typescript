import { HittableList } from "../../entities/HittableList";
import { Sphere } from "../../entities/objects/Sphere";
import { IImageLibrary } from "../../libraries/IImageLibrary";
import { Point } from "../../utils/Point";
import { Camera } from "../../camera/Camera";
import { NormalMap } from "../../materials/NormalMap";

export function antialiasing(imageLibrary: IImageLibrary) {
  const camera = new Camera({
    imageWidth: 400,
    samplePerPixel: 50,
    aspectRatio: 16 / 9,
  });
  const world = new HittableList();

  const material = new NormalMap();

  world.add(new Sphere(new Point(0, 0, -1), 0.5, material));
  world.add(new Sphere(new Point(0, -100.5, -1), 100, material));

  camera.render(imageLibrary, world, "chapter8/antialiasing.png");
}
