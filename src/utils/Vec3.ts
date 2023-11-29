import { Color } from "./Color";
import { Point } from "./Point";
import { randomMinMax } from "./Support";

type GenericVec3 = Vec3 | Point | Color;

export class Vec3 {
  public x: number;
  public y: number;
  public z: number;

  constructor(x: number, y: number, z: number) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  static sum(...arrayValues: GenericVec3[]) {
    if (arrayValues.length == 0) return new Vec3(0, 0, 0);
    const sumVec3 = arrayValues.reduce(
      (acc, element) => {
        return {
          x: acc.x + element.x,
          y: acc.y + element.y,
          z: acc.z + element.z,
        };
      },
      { x: 0, y: 0, z: 0 }
    );
    return new Vec3(sumVec3.x, sumVec3.y, sumVec3.z);
  }

  static mult(...arrayValues: GenericVec3[]) {
    if (arrayValues.length == 0) return new Vec3(0, 0, 0);

    const multVec3 = arrayValues.reduce(
      (acc, element) => {
        return {
          x: acc.x * element.x,
          y: acc.y * element.y,
          z: acc.z * element.z,
        };
      },
      { x: 1, y: 1, z: 1 }
    );
    return new Vec3(multVec3.x, multVec3.y, multVec3.z);
  }

  static sub(u: GenericVec3, v: GenericVec3): GenericVec3 {
    return new Vec3(u.x - v.x, u.y - v.y, u.z - v.z);
  }

  public scalarMult(scalar: number): GenericVec3 {
    return new Vec3(this.x * scalar, this.y * scalar, this.z * scalar);
  }

  public scalarDiv(scalar: number): GenericVec3 {
    return this.scalarMult(1 / scalar);
  }

  static dot(u: GenericVec3, v: GenericVec3): number {
    return u.x * v.x + u.y * v.y + u.z * v.z;
  }

  static cross(u: GenericVec3, v: GenericVec3): GenericVec3 {
    return new Vec3(
      u.y * v.z - u.z * v.y,
      u.z * v.x - u.x * v.z,
      u.x * v.y - u.y * v.x
    );
  }

  public vectorLength(): number {
    return Math.sqrt(
      Math.pow(this.x, 2) + Math.pow(this.y, 2) + Math.pow(this.z, 2)
    );
  }

  public vectorLengthSquared(): number {
    return Math.pow(this.x, 2) + Math.pow(this.y, 2) + Math.pow(this.z, 2);
  }

  public unitVector(): GenericVec3 {
    return this.scalarDiv(this.vectorLength());
  }

  static randomVector(min: number, max: number): GenericVec3 {
    return new Vec3(
      randomMinMax(min, max),
      randomMinMax(min, max),
      randomMinMax(min, max)
    );
  }

  private static randomVectorInUnitSphere(): GenericVec3 {
    while (true) {
      const newVec = Vec3.randomVector(-1, 1);
      if (newVec.vectorLength() < 1) {
        return newVec;
      }
    }
  }

  static randomUnitVector(): GenericVec3 {
    return Vec3.randomVectorInUnitSphere().unitVector();
  }

  static randomInUnitDisk() {
    while (true) {
      const newVec = new Vec3(randomMinMax(-1, 1), randomMinMax(-1, 1), 0);
      if (newVec.vectorLength() < 1) return newVec;
    }
  }

  static reflect(r: GenericVec3, n: GenericVec3): GenericVec3 {
    /*
      n é unitário e dot product é só um número representando o tamanho do vetor,
      assim, n dirá a direção do vetor e o dot product o tamanho.
      Além disso, a subtração deve ser feita pois o dot product de v e n é negativo
      pois então em direções diferentes.
    */

    return Vec3.sub(r, n.scalarMult(2 * this.dot(r, n)));
  }

  static refract(
    r: GenericVec3,
    n: GenericVec3,
    reflectsIndexQuotient: number
  ): GenericVec3 {
    const cos = Vec3.dot(r.scalarMult(-1), n);

    const rayPerp = Vec3.sum(r, n.scalarMult(cos)).scalarMult(
      reflectsIndexQuotient
    );
    const rayParallelScalar = -Math.sqrt(
      Math.abs(1 - rayPerp.vectorLengthSquared())
    );
    const rayParallel = n.scalarMult(rayParallelScalar);
    return this.sum(rayPerp, rayParallel);
  }

  public nearZero(): boolean {
    const s = 1e-8;
    return Math.abs(this.x) < s && Math.abs(this.y) < s && Math.abs(this.z) < s;
  }

  public toString(): string {
    return `{${this.x}, ${this.y}, ${this.z}}`;
  }
}
