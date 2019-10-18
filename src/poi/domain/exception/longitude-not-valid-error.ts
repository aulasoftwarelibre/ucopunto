export class LongitudeNotValidError extends Error {
    static withLongitude(longitude: number): LongitudeNotValidError {
      return new this(`Longitude ${longitude} not valid.`);
    }
  }
  