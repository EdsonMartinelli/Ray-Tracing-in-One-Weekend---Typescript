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
import { IMaterial } from "../../materials/IMaterial";
import { randomMinMax } from "../../utils/Support";

export function final(imageLibrary: IImageLibrary) {
  const camera = new Camera({
    imageWidth: 1200,
    samplePerPixel: 500,
    aspectRatio: 16 / 9,
    vfov: 20,
    lookFrom: new Point(13, 2, 3),
    lookAt: new Point(0, 0, 0),
    vup: new Vec3(0, 1, 0),
    defocusAngle: 0.6,
    focusDist: 10,
  });

  const world = new HittableList();

  const materialGround = new Lambertian(new Color(0.5, 0.5, 0.5));
  world.add(new Sphere(new Point(0, -1000, 0), 1000, materialGround));

  for (let a = -11; a < 11; a++) {
    for (let b = -11; b < 11; b++) {
      const choose_mat = Math.random();
      const center = new Point(
        a + 0.9 * Math.random(),
        0.2,
        b + 0.9 * Math.random()
      );

      if (Point.sub(center, new Point(4, 0.2, 0)).vectorLength() > 0.9) {
        let sphereMaterial: IMaterial | null = null;

        if (choose_mat < 0.8) {
          // diffuse
          const albedo = Color.mult(
            Color.randomVector(0, 1),
            Color.randomVector(0, 1)
          );
          sphereMaterial = new Lambertian(albedo);
          world.add(new Sphere(center, 0.2, sphereMaterial));
        } else if (choose_mat < 0.95) {
          // metal
          const albedo = Color.randomVector(0.5, 1);
          const fuzz = randomMinMax(0, 0.5);
          sphereMaterial = new Metal(albedo, fuzz);
          world.add(new Sphere(center, 0.2, sphereMaterial));
        } else {
          // glass
          sphereMaterial = new Dielectric(1.5);
          world.add(new Sphere(center, 0.2, sphereMaterial));
        }
      }
    }
  }

  const material1 = new Dielectric(1.5);
  world.add(new Sphere(new Point(0, 1, 0), 1.0, material1));

  const material2 = new Lambertian(new Color(0.4, 0.2, 0.1));
  world.add(new Sphere(new Point(-4, 1, 0), 1.0, material2));

  const material3 = new Metal(new Color(0.7, 0.6, 0.5), 0.0);
  world.add(new Sphere(new Point(4, 1, 0), 1.0, material3));

  camera.render(imageLibrary, world, "chapter14/final_500.png");
}
