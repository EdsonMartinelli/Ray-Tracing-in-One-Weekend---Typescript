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

export function cameraPositionScene(imageLibrary: IImageLibrary) {
  const camera = new Camera({
    imageWidth: 400,
    samplePerPixel: 50,
    aspectRatio: 16 / 9,
    vfov: 20,
    lookFrom: new Point(-2, 2, 1),
    lookAt: new Point(0, 0, -1),
    vup: new Vec3(0, 1, 0),
  });

  const world = new HittableList();

  /*const R = Math.cos(Math.PI / 4);
  const materialLeft = new Lambertian(new Color({ x: 0, y: 0, z: 1 }));
  const materialRight = new Lambertian(new Color({ x: 1, y: 0, z: 0 }));

  world.add(new Sphere(new Point({ x: -R, y: 0, z: -1 }), R, materialLeft));
  world.add(new Sphere(new Point({ x: R, y: 0, z: -1 }), R, materialRight));*/

  const materialGround = new Lambertian(new Color(0.8, 0.8, 0));
  const materialCenter = new Lambertian(new Color(0.1, 0.2, 0.5));
  const materialLeft = new Dielectric(1.5);
  const materialRight = new Metal(new Color(0.8, 0.6, 0.2), 0);

  world.add(new Sphere(new Point(0, -100.5, -1), 100, materialGround));
  world.add(new Sphere(new Point(0, 0, -1), 0.5, materialCenter));
  world.add(new Sphere(new Point(-1, 0, -1), 0.5, materialLeft));
  world.add(new Sphere(new Point(-1, 0, -1), -0.4, materialLeft));
  world.add(new Sphere(new Point(1, 0, -1), 0.5, materialRight));

  camera.render(imageLibrary, world, "chapter12/zooming_in.png");
}
