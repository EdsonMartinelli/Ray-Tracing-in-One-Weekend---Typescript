export function degreesToRadian(angle: number) {
  return (angle * Math.PI) / 180;
}

export function randomMinMax(min: number, max: number) {
  return Math.random() * (max - min) + min;
}
