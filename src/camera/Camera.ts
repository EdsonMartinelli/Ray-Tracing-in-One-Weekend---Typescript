import { IImageLibrary } from "../libraries/IImageLibrary";
import { Color } from "../utils/Color";
import { Interval } from "../utils/Interval";
import { Point } from "../utils/Point";
import { Ray } from "../utils/Ray";
import { Vec3 } from "../utils/Vec3";
import { HittableList } from "../entities/HittableList";
import { degreesToRadian } from "../utils/Support";
import { NormalMap } from "../materials/NormalMap";

type CameraProps = {
  imageWidth: number;
  samplePerPixel: number;
  aspectRatio: number;
  vfov?: number;
  lookFrom?: Point;
  lookAt?: Point;
  vup?: Vec3;
  defocusAngle?: number;
  focusDist?: number;
};

export class Camera {
  private horizontal: Vec3;
  private vertical: Vec3;
  private topLeftCorner: Vec3;
  private imageWidth: number;
  private imageHeight: number;
  private samplePerPixel: number;
  private maxDepth: number;

  private vfov: number;

  private lookFrom: Point;
  private lookAt: Point;
  private vup: Vec3;

  private defocusAngle: number;
  private defocusHorizontal: Vec3;
  private defocusVertical: Vec3;

  constructor({
    imageWidth,
    samplePerPixel,
    aspectRatio,
    vfov = 90,
    lookFrom = new Point(0, 0, 0),
    lookAt = new Point(0, 0, -1),
    vup = new Vec3(0, 1, 0),
    defocusAngle = 0,
    focusDist = 1,
  }: CameraProps) {
    const imageHeight = Math.round(imageWidth / aspectRatio);

    this.lookFrom = lookFrom;
    this.lookAt = lookAt;
    this.vup = vup;

    this.vfov = vfov;

    this.defocusAngle = defocusAngle;

    const focalLength =
      defocusAngle <= 0
        ? Vec3.sub(this.lookFrom, this.lookAt).vectorLength()
        : focusDist;

    const theta = degreesToRadian(this.vfov);
    const h = Math.tan(theta / 2);

    const viewportHeight = 2 * h * focalLength;

    const viewportWidth = aspectRatio * viewportHeight;
    const { horizontal, vertical, focalVec } = this.createAxisVectors(
      viewportWidth,
      viewportHeight,
      focalLength
    );
    const topLeftCorner = this.createTopLeftCorner(
      horizontal,
      vertical,
      focalVec
    );

    const defocusRadius =
      focusDist * Math.tan(degreesToRadian(defocusAngle / 2));

    this.horizontal = horizontal;
    this.vertical = vertical;
    this.topLeftCorner = topLeftCorner;
    this.imageWidth = imageWidth;
    this.imageHeight = imageHeight;
    this.samplePerPixel = samplePerPixel;
    this.maxDepth = 50;

    this.defocusHorizontal = horizontal.scalarMult(defocusRadius);
    this.defocusVertical = vertical.scalarMult(defocusRadius);
  }

  public render(
    imageLibrary: IImageLibrary,
    world: HittableList,
    fileName: string
  ) {
    const pixels: Color[] = [];
    for (let y = 0; y < this.imageHeight; y++) {
      for (let x = 0; x < this.imageWidth; x++) {
        const u = (x + 0.5) / this.imageWidth;
        const v = (y + 0.5) / this.imageHeight;

        let color = new Color(0, 0, 0);
        for (let sample = 0; sample < this.samplePerPixel; sample++) {
          const rayPixel = this.getRay(u, v);
          color = Color.sum(
            color,
            this.rayColor(rayPixel, this.maxDepth, world)
          );
        }
        pixels.push(color);
      }
    }

    imageLibrary.createBufferImage({
      pixels,
      samplePerPixel: this.samplePerPixel,
      width: this.imageWidth,
      height: this.imageHeight,
      name: fileName,
    });
  }

  private createAxisVectors(
    viewportWidth: number,
    viewportHeight: number,
    focalLength: number
  ) {
    const w = Vec3.sub(this.lookFrom, this.lookAt).unitVector();
    const horizontal = Vec3.cross(this.vup, w).unitVector();
    const vertical = Vec3.cross(w, horizontal);

    return {
      horizontal: horizontal.scalarMult(viewportWidth),
      vertical: vertical.scalarMult(-viewportHeight),
      focalVec: w.scalarMult(-focalLength),
    };
  }

  private createTopLeftCorner(
    horizontal: Vec3,
    vertical: Vec3,
    focalVec: Vec3
  ) {
    const halfHorizontal = horizontal.scalarDiv(2);
    const halfVertical = vertical.scalarDiv(2);

    return Vec3.sum(
      halfHorizontal.scalarMult(-1),
      halfVertical.scalarMult(-1),
      focalVec
    );
  }

  private getRay(u: number, v: number) {
    const px = (-0.5 + Math.random()) / this.imageWidth;
    const py = (-0.5 + Math.random()) / this.imageHeight;
    const horizontalViewportPercent = this.horizontal.scalarMult(u + px);
    const verticalViewportPercent = this.vertical.scalarMult(v + py);

    const rayPixel = Vec3.sum(
      this.topLeftCorner,
      horizontalViewportPercent,
      verticalViewportPercent
    );

    if (this.defocusAngle <= 0) {
      return new Ray({
        origin: this.lookFrom,
        direction: rayPixel,
      });
    }

    const defocusOffset = this.defocusDisk();

    return new Ray({
      origin: Vec3.sum(this.lookFrom, defocusOffset),
      direction: Vec3.sub(rayPixel, defocusOffset),
    });
  }

  private defocusDisk() {
    const offsetVec = Vec3.randomInUnitDisk();
    return Vec3.sum(
      this.defocusHorizontal.scalarMult(offsetVec.x),
      this.defocusVertical.scalarMult(offsetVec.y)
    );
  }

  private rayColor(ray: Ray, depth: number, world: HittableList): Color {
    if (depth <= 0) {
      return new Color(0, 0, 0);
    }
    const minInterval = 0.001;
    const rec = world.hit(ray, new Interval(minInterval, Infinity));
    if (rec != null) {
      const material = rec.mat;
      if (material == null) return new Color(0, 0, 0);
      const scatter = material.scatter(ray, rec);
      if (scatter != null) {
        const { attenuation, scattered } = scatter;
        if (material instanceof NormalMap) return attenuation;
        return Color.mult(
          attenuation,
          this.rayColor(scattered, depth - 1, world)
        );
      }
      return new Color(0, 0, 0);
    }
    const unitDirection = ray.direction.unitVector();
    const t = 0.5 * (unitDirection.y + 1);
    const startColor = Color.white().scalarMult(1 - t);
    const endColor = Color.skyBlue().scalarMult(t);
    return Color.sum(startColor, endColor);
  }
}
