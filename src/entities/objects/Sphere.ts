import { Interval } from "../../utils/Interval";
import { Point } from "../../utils/Point";
import { Ray } from "../../utils/Ray";
import { Vec3 } from "../../utils/Vec3";
import { HitRecord } from "../../utils/HitRecord";
import { IHittable } from "../IHittable";
import { IMaterial } from "../../materials/IMaterial";

export class Sphere implements IHittable {
  private sphereCenter: Point;
  private sphereRadius: number;
  private material: IMaterial | null;

  constructor(
    sphereCenter: Point,
    sphereRadius: number,
    material: IMaterial | null = null
  ) {
    this.sphereCenter = sphereCenter;
    this.sphereRadius = sphereRadius;
    this.material = material;
  }

  hit(ray: Ray, ray_t: Interval): HitRecord | null {
    const oc = Point.sub(ray.origin, this.sphereCenter);
    const a = Vec3.dot(ray.direction, ray.direction);
    const halfB = Vec3.dot(oc, ray.direction);
    const c = Point.dot(oc, oc) - this.sphereRadius * this.sphereRadius;
    const discriminant = halfB * halfB - a * c;

    if (discriminant < 0) return null;
    const sqrtd = Math.sqrt(discriminant);
    let root = (-halfB - sqrtd) / a;

    if (!ray_t.surrounds(root)) {
      root = (-halfB + sqrtd) / a;
      if (!ray_t.surrounds(root)) return null;
    }

    const rec = new HitRecord();
    rec.t = root;
    rec.p = ray.at(rec.t);
    const outwardNormal = Vec3.sub(rec.p, this.sphereCenter).scalarDiv(
      this.sphereRadius
    );
    rec.setFaceNormal(ray, outwardNormal);
    rec.mat = this.material;

    return rec;
  }
}
