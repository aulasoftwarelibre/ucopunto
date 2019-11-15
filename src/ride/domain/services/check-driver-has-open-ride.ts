import { Ride, RideId } from '../model';
import { UserId } from '../../../user/domain/model';

export interface CheckDriverHasOpenRide {
  with(driverId: UserId): Promise<RideId> | null;
}

export const CHECK_DRIVER_HAS_OPEN_RIDE = 'CHECK_DRIVER_HAS_OPEN_RIDE';
