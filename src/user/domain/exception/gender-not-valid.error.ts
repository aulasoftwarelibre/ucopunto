export class GenderNotValidError extends Error {
  static withGender(userid: string): GenderNotValidError {
    return new this(`Gender ${userid} not valid.`);
  }
}
