import { RideId } from '../model/ride-id';

export class RideIdAlreadyRegisteredError extends Error {
  static withRideId(rideId: RideId): RideIdAlreadyRegisteredError {
    return new this(`RideId ${rideId.value} already registered.`);
  }
}