import { Color } from "../utils/Color";
import { HitRecord } from "../utils/HitRecord";
import { Ray } from "../utils/Ray";
import { Vec3 } from "../utils/Vec3";
import { IMaterial, MaterialScatter } from "./IMaterial";

export class Metal implements IMaterial {
  private albedo: Color;
  private fuzz: number;

  constructor(albedo: Color, fuzz: number) {
    this.albedo = albedo;
    this.fuzz = fuzz < 1 ? fuzz : 1;
  }

  scatter(rayIn: Ray, rec: HitRecord): MaterialScatter | null {
    const reflectedDirection = Vec3.reflect(rayIn.direction, rec.normal);
    const fuzzyReflectDirection = Vec3.sum(
      reflectedDirection,
      Vec3.randomUnitVector().scalarMult(this.fuzz)
    );

    if (Vec3.dot(fuzzyReflectDirection, rec.normal) < 0) return null;

    return {
      attenuation: this.albedo,
      scattered: new Ray({ origin: rec.p, direction: fuzzyReflectDirection }),
    };
  }
}
