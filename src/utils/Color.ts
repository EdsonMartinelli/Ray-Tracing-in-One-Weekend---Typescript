import { Vec3 } from "./Vec3";

export class Color extends Vec3 {
  static white() {
    return new Color(1, 1, 1);
  }

  static skyBlue() {
    return new Color(0.5, 0.7, 1);
  }

  static red() {
    return new Color(1, 0, 0);
  }

  static black() {
    return new Color(0, 0, 0);
  }
}
