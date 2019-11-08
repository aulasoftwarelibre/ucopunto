export class InvalidWaitingTimeInMinutesException extends Error {
  static withWaitingTimeInMinutes(
    value: number,
  ): InvalidWaitingTimeInMinutesException {
    return new this('${value} is not a valid waiting time in minutes');
  }
}
