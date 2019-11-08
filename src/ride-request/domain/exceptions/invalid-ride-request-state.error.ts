export class InvalidRideRequestStateError extends Error {
  static withRideRequestState(value: string): InvalidRideRequestStateError {
    return new this('${value} is not a valid ride request state');
  }
}
