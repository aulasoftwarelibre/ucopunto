export class InvalidNumberOfPassengersException extends Error {
  static withNumberOfPassengers(
    value: number,
  ): InvalidNumberOfPassengersException {
    return new this('${value} is not a valid number of passengers');
  }
}
