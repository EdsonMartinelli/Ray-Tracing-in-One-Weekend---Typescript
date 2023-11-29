import { Color } from "../utils/Color";
import { HitRecord } from "../utils/HitRecord";
import { Ray } from "../utils/Ray";
import { Vec3 } from "../utils/Vec3";
import { IMaterial, MaterialScatter } from "./IMaterial";

export class Lambertian implements IMaterial {
  private albedo: Color;

  constructor(albedo: Color) {
    this.albedo = albedo;
  }

  scatter(rayIn: Ray, rec: HitRecord): MaterialScatter | null {
    const scatterDirection = Vec3.sum(rec.normal, Vec3.randomUnitVector());

    if (scatterDirection.nearZero())
      return {
        attenuation: this.albedo,
        scattered: new Ray({ origin: rec.p, direction: rec.normal }),
      };

    return {
      attenuation: this.albedo,
      scattered: new Ray({ origin: rec.p, direction: scatterDirection }),
    };

    return null;
  }
}
