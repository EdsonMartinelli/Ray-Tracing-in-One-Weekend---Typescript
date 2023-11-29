import { JimpLib } from "./libraries/jimp/JimpLib";
import { coloredSphere } from "./chapters/chapter6/coloredSphere";
import { redSphere } from "./chapters/chapter5/redSphere";
import { blueWhiteGradient } from "./chapters/chapter4/blueWhiteGradient";
import { helloWorld } from "./chapters/chapter2/helloWorld";
import { sphereWithGround } from "./chapters/chapter6/sphereWithGround";
import { antialiasing } from "./chapters/chapter8/Antialiasing";
import { diffuseSphere } from "./chapters/chapter9/DiffuseSphere";
import { metalSpheres } from "./chapters/chapter10/MetalSpheres";
import { dieletricSphere } from "./chapters/chapter11/DieletricSphere";
import { cameraPositionScene } from "./chapters/chapter12/CameraPositionScene";
import { defocusBlurExample } from "./chapters/chapter13/defocusBlurExample";
import { defocusBlur } from "./chapters/chapter13/defocusBlur";
import { final } from "./chapters/chapter14/Final";

function main(): void {
  //helloWorld(new JimpLib());
  //blueWhiteGradient(new JimpLib());
  //redSphere(new JimpLib());
  //coloredSphere(new JimpLib());
  //sphereWithGround(new JimpLib());
  //antialiasing(new JimpLib());
  //diffuseSphere(new JimpLib());
  //metalSpheres(new JimpLib());
  //dieletricSphere(new JimpLib());
  //cameraPositionScene(new JimpLib());
  //defocusBlurExample(new JimpLib());
  //defocusBlur(new JimpLib());
  final(new JimpLib());
  console.log("Finished");
}

main();
