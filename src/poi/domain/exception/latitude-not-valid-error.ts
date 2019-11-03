export class LatitudeNotValidError extends Error {
  static withLatitude(latitude: number): LatitudeNotValidError {
    return new this(`Latitude ${latitude} not valid.`);
  }
}
