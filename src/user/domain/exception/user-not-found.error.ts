import { UserId } from '../model';

export class UserNotFoundError extends Error {
  static withUserId(userId: UserId): UserNotFoundError {
    return new this(`User with id ${userId.value} cannot be found.`);
  }
}
