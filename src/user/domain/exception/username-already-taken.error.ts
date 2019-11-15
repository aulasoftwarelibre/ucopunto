import { Username } from '../model';

export class UsernameAlreadyTakenError extends Error {
  static withUsername(username: Username): UsernameAlreadyTakenError {
    return new this(`Username ${username.value} already taken.`);
  }
}
