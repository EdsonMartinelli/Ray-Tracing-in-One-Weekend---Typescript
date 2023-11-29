import { Ray } from "../utils/Ray";
import { Interval } from "../utils/Interval";
import { HitRecord } from "../utils/HitRecord";

export interface IHittable {
  hit: (ray: Ray, ray_t: Interval) => HitRecord | null;
}
