import { HittableList } from "../../entities/HittableList";
import { Sphere } from "../../entities/objects/Sphere";
import { IImageLibrary } from "../../libraries/IImageLibrary";
import { Point } from "../../utils/Point";
import { Camera } from "../../camera/Camera";
import { Lambertian } from "../../materials/Lambertian";
import { Color } from "../../utils/Color";

export function diffuseSphere(imageLibrary: IImageLibrary) {
  const camera = new Camera({
    imageWidth: 400,
    samplePerPixel: 50,
    aspectRatio: 16 / 9,
  });
  const world = new HittableList();

  const material = new Lambertian(new Color(0.5, 0.5, 0.5));

  world.add(new Sphere(new Point(0, 0, -1), 0.5, material));
  world.add(new Sphere(new Point(0, -100.5, -1), 100, material));

  camera.render(
    imageLibrary,
    world,
    "chapter9/diffuse_sphere_lambertian_gamma_correction.png"
  );
}
