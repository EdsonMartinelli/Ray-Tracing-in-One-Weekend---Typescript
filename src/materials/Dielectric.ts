import { Color } from "../utils/Color";
import { HitRecord } from "../utils/HitRecord";
import { Ray } from "../utils/Ray";
import { Vec3 } from "../utils/Vec3";
import { IMaterial, MaterialScatter } from "./IMaterial";

export class Dielectric implements IMaterial {
  private indexOfReflaction: number;

  constructor(indexOfReflaction: number) {
    this.indexOfReflaction = indexOfReflaction;
  }

  scatter(rayIn: Ray, rec: HitRecord): MaterialScatter | null {
    const attenuation = new Color(1, 1, 1);
    const refractionRatio = rec.isFaceFront
      ? 1.0 / this.indexOfReflaction
      : this.indexOfReflaction;
    // is face front ?  Air to Material : Material to Air

    const rayDirectionUnit = rayIn.direction.unitVector();
    const cos = Vec3.dot(rayDirectionUnit.scalarMult(-1), rec.normal);
    const sin = Math.sqrt(1 - cos * cos);

    const cannotRefract = refractionRatio * sin > 1.0;

    if (
      cannotRefract ||
      this.reflectance(cos, refractionRatio) > Math.random()
    ) {
      const reflectDirection = Vec3.reflect(rayDirectionUnit, rec.normal);
      return {
        attenuation,
        scattered: new Ray({ origin: rec.p, direction: reflectDirection }),
      };
    }
    const refractedDirection = Vec3.refract(
      rayDirectionUnit,
      rec.normal,
      refractionRatio
    );
    return {
      attenuation,
      scattered: new Ray({ origin: rec.p, direction: refractedDirection }),
    };
  }

  private reflectance(cos: number, refIndex: number) {
    // Use Schlick's approximation for reflectance.
    const r0 = Math.pow((1 - refIndex) / (1 + refIndex), 2);
    return r0 + (1 - r0) * Math.pow(1 - cos, 5);
  }
}
