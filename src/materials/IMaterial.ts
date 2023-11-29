import { Color } from "../utils/Color";
import { HitRecord } from "../utils/HitRecord";
import { Ray } from "../utils/Ray";

export type MaterialScatter = {
  attenuation: Color;
  scattered: Ray;
};

export interface IMaterial {
  scatter: (rayIn: Ray, rec: HitRecord) => MaterialScatter | null;
}
