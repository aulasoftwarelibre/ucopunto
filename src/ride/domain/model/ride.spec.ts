import { RideId } from './ride-id';
import uuid = require('uuid');
import { UserId } from '../../../user/domain/model';
import { RideWasCreated } from '../event/ride-was-created';
import { Ride } from './ride';

describe('Ride', () => {
  const rideId = RideId.fromString(uuid.v4());
  const driverId = UserId.fromString(uuid.v4());

  it('can be created', () => {
    const ride = Ride.add(rideId, driverId);

    expect(ride.getUncommittedEvents()).toContainEqual(
      new RideWasCreated(rideId.value, driverId.value),
    );
  });

  it('has an id', () => {
    const ride = Ride.add(rideId, driverId);

    expect(ride.id.equals(rideId)).toBeTruthy();
  });

  it('has a driver', () => {
    const ride = Ride.add(rideId, driverId);

    expect(ride.driverId.equals(driverId)).toBeTruthy();
  });
});
