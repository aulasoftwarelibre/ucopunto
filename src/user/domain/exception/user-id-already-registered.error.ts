import { UserId } from '../model';

export class UserIdAlreadyRegisteredError extends Error {
  static withUserId(userId: UserId): UserIdAlreadyRegisteredError {
    return new this(`UserId ${userId.value} already taken.`);
  }
}
