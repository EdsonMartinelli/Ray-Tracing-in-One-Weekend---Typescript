import { HittableList } from "../../entities/HittableList";
import { Sphere } from "../../entities/objects/Sphere";
import { IImageLibrary } from "../../libraries/IImageLibrary";
import { Point } from "../../utils/Point";
import { Camera } from "../../camera/Camera";
import { Lambertian } from "../../materials/Lambertian";
import { Color } from "../../utils/Color";
import { Metal } from "../../materials/Metal";
import { Dielectric } from "../../materials/Dielectric";
import { Vec3 } from "../../utils/Vec3";

export function defocusBlur(imageLibrary: IImageLibrary) {
  const camera = new Camera({
    imageWidth: 400,
    samplePerPixel: 50,
    aspectRatio: 16 / 9,
    vfov: 20,
    lookFrom: new Point(-2, 2, 1),
    lookAt: new Point(0, 0, -1),
    vup: new Vec3(0, 1, 0),
    defocusAngle: 10,
    focusDist: 3.4,
  });

  const world = new HittableList();

  const materialGround = new Lambertian(new Color(0.8, 0.8, 0));
  const materialCenter = new Lambertian(new Color(0.1, 0.2, 0.5));
  const materialLeft = new Dielectric(1.5);
  const materialRight = new Metal(new Color(0.8, 0.6, 0.2), 0);

  world.add(new Sphere(new Point(0, -100.5, -1), 100, materialGround));
  world.add(new Sphere(new Point(0, 0, -1), 0.5, materialCenter));
  world.add(new Sphere(new Point(-1, 0, -1), 0.5, materialLeft));
  world.add(new Sphere(new Point(-1, 0, -1), -0.4, materialLeft));
  world.add(new Sphere(new Point(1, 0, -1), 0.5, materialRight));

  camera.render(
    imageLibrary,
    world,
    "chapter13/spheres_with_depth_of_field.png"
  );
}
