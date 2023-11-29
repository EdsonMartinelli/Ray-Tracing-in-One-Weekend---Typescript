import { Point } from "./Point";
import { Vec3 } from "./Vec3";
import { Ray } from "./Ray";
import { IMaterial } from "../materials/IMaterial";

export class HitRecord {
  p: Point;
  normal: Vec3;
  mat: IMaterial | null;
  t: number;
  isFaceFront: boolean;

  constructor() {
    this.p = new Point(0, 0, 0); // Ponto de contato
    this.normal = new Vec3(0, 0, 0); // Normal unitária
    this.t = 0; // t necessário para o ponto de contato
    this.isFaceFront = false; // o hit atinge o objeto por dentro ou por fora
    this.mat = null; // material
  }

  /*setValues(object: HitRecord) {
    this.p = object.p;
    this.normal = object.normal;
    this.t = object.t;
  }*/

  setFaceNormal(ray: Ray, outwardNormal: Vec3) {
    this.isFaceFront = Vec3.dot(ray.direction, outwardNormal) < 0;
    this.normal = this.isFaceFront
      ? outwardNormal
      : outwardNormal.scalarMult(-1);
  }
}
