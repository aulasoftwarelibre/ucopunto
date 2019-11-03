export class CoordinateNotValidError extends Error {
  static withCoordinate(coordinate: Array<number>): CoordinateNotValidError {
    return new this(`coordinate ${coordinate} not valid.`);
  }
}
