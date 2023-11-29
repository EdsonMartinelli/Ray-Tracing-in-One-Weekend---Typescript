import { Point } from "./Point";
import { Vec3 } from "./Vec3";

interface IRay {
  origin: Point;
  direction: Vec3;
}

export class Ray {
  public origin: Point;
  public direction: Vec3;

  constructor({ origin, direction }: IRay) {
    this.origin = origin;
    this.direction = direction;
  }

  at(t: number): Point {
    return Point.sum(this.origin, this.direction.scalarMult(t));
  }
}
