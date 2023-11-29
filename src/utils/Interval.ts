export class Interval {
  min: number;
  max: number;

  static empty = { min: Infinity, max: -Infinity };
  static universe = { min: -Infinity, max: +Infinity };

  constructor(
    min: number = Interval.empty.min,
    max: number = Interval.empty.max
  ) {
    this.min = min;
    this.max = max;
  }

  contains(x: number) {
    return this.min <= x && x <= this.max;
  }

  surrounds(x: number) {
    return this.min < x && x < this.max;
  }
}
