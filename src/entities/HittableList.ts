import { Ray } from "../utils/Ray";
import { HitRecord } from "../utils/HitRecord";
import { IHittable } from "./IHittable";
import { Interval } from "../utils/Interval";

export class HittableList implements IHittable {
  private objects: IHittable[];

  constructor() {
    this.objects = [];
  }

  clear() {
    this.objects = [];
  }

  add(object: IHittable) {
    this.objects.push(object);
  }

  hit(ray: Ray, ray_t: Interval): HitRecord | null {
    let tempRec = new HitRecord();
    let hitAnything = false;
    let closest_so_far = ray_t.max;

    for (const object of this.objects) {
      const recHitObject = object.hit(
        ray,
        new Interval(ray_t.min, closest_so_far)
      );

      if (recHitObject != null) {
        hitAnything = true;
        closest_so_far = recHitObject.t;
        tempRec = recHitObject;
      }
      /*if (object.hit(ray, new Interval(ray_t.min, closest_so_far), tempRec)) {
        hitAnything = true;
        closest_so_far = tempRec.t;
        //rec = tempRec;
        //rec.p = tempRec.p;
        //rec.normal = tempRec.normal;
        //rec.t = tempRec.t;
        //rec.setValues(tempRec);
      }*/
    }

    return hitAnything ? tempRec : null;
  }
}
