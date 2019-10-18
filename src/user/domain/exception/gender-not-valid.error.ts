export class GenderNotValidError extends Error {
  static withGender(gender: string): GenderNotValidError {
    return new this(`Gender ${gender} not valid.`);
  }
}
