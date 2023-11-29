import { Color } from "../utils/Color";
import { HitRecord } from "../utils/HitRecord";
import { Ray } from "../utils/Ray";
import { IMaterial, MaterialScatter } from "./IMaterial";

export class NormalMap implements IMaterial {
  scatter(rayIn: Ray, rec: HitRecord): MaterialScatter | null {
    /*const albedo = Color.scalarMult(
      new Color(rec.normal.x + 1, rec.normal.y + 1, rec.normal.z + 1),
      0.5
    );*/
    const albedo = new Color(
      rec.normal.x + 1,
      rec.normal.y + 1,
      rec.normal.z + 1
    ).scalarMult(0.5);

    return {
      attenuation: albedo,
      scattered: new Ray({ origin: rec.p, direction: rec.normal }),
    };
  }
}
