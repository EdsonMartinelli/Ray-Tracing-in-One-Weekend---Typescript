import { IImageLibrary } from "../../libraries/IImageLibrary";
import { Color } from "../../utils/Color";
import { Point } from "../../utils/Point";
import { Ray } from "../../utils/Ray";
import { Vec3 } from "../../utils/Vec3";

function createAxisVectors(viewportWidth: number, viewportHeight: number) {
  return {
    horizontal: new Vec3(viewportWidth, 0, 0),
    vertical: new Vec3(0, -viewportHeight, 0),
  };
}

function createTopLeftCorner(
  horizontal: Vec3,
  vertical: Vec3,
  focalLength: number
) {
  const halfHorizontal = horizontal.scalarDiv(2);
  const halfVertical = vertical.scalarDiv(2);
  const focalVec = new Vec3(0, 0, -focalLength);

  return Vec3.sum(
    halfHorizontal.scalarMult(-1),
    halfVertical.scalarMult(-1),
    focalVec
  );
}

export function coloredSphere(imageLibrary: IImageLibrary) {
  const pixels: Color[] = [];
  const aspectRatio = 16 / 9;

  const imageWidth = 400;
  const imageHeight = Math.round(imageWidth / aspectRatio);

  const cameraOrigin = new Point(0, 0, 0);
  const viewportHeight = 2;

  const sphereCenter = new Point(0, 0, -1);
  const sphereRadius = 0.5;

  const viewportWidth = aspectRatio * viewportHeight;
  const { horizontal, vertical } = createAxisVectors(
    viewportWidth,
    viewportHeight
  );
  const topLeftCorner = createTopLeftCorner(horizontal, vertical, 1);

  for (let y = 0; y < imageHeight; y++) {
    for (let x = 0; x < imageWidth; x++) {
      const u = (x + 0.5) / imageWidth;
      const v = (y + 0.5) / imageHeight;
      const horizontalViewportPercent = horizontal.scalarMult(u);
      const verticalViewportPercent = vertical.scalarMult(v);

      const rayPixel = Vec3.sum(
        topLeftCorner,
        horizontalViewportPercent,
        verticalViewportPercent
      );

      const color = rayColor(
        new Ray({
          origin: cameraOrigin,
          direction: rayPixel,
        })
      );
      pixels.push(color);
    }
  }

  function rayColor(ray: Ray): Color {
    const hit_value = hitSphereSimplified(sphereCenter, sphereRadius, ray);
    if (hit_value > 0) {
      const t = Vec3.sub(ray.at(hit_value), sphereCenter);
      const N = t.unitVector();
      /*
        Como o vetor unitário é formado pela divisão de todas suas coordenas
        por seu tamanho as novas coordenadass podem assumir números entre -1 e 1.
        Assim, para manter o vetor positivo, todos as coordenadas recebem o acrescimo
        de uma posição, ficando entre 0 e 2.
      */
      const color = new Color(N.x + 1, N.y + 1, N.z + 1);
      /*
        Dividi-se o vetor de cor por 2 para garantir que o valor da cor esteja entre
        0 e 1, como o esperado.
      */
      return color.scalarMult(0.5);
    }
    const unitDirection = ray.direction.unitVector();
    const t = 0.5 * (unitDirection.y + 1);
    const startColor = Color.white().scalarMult(1 - t);
    const endColor = Color.skyBlue().scalarMult(t);
    return Color.sum(startColor, endColor);
  }

  function hitSphereSimplified(
    sphereCenter: Point,
    sphereRadius: number,
    ray: Ray
  ): number {
    const oc = Point.sub(ray.origin, sphereCenter);
    const a = Vec3.dot(ray.direction, ray.direction);
    const halfB = Vec3.dot(oc, ray.direction);
    const c = Point.dot(oc, oc) - sphereRadius * sphereRadius;
    const discriminant = halfB * halfB - a * c;

    if (discriminant < 0) {
      return -1.0;
    } else {
      return (-halfB - Math.sqrt(discriminant)) / a;
    }
  }

  imageLibrary.createBufferImage({
    pixels,
    width: imageWidth,
    height: imageHeight,
    name: "chapter6/colored_sphere.png",
  });
}
