import { UserId } from '../../../user/domain/model/user-id';

export class DriverIdAlreadyRegisteredError extends Error {
  static withDriverId(driverId: UserId): DriverIdAlreadyRegisteredError {
    return new this(`Driver Id ${driverId.value} registered a ride already.`);
  }
}
