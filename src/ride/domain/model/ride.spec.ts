import { RideId } from './ride-id';
import uuid = require('uuid');
import { UserId } from '../../../user/domain/model';
import { RideWasCreated } from '../event/ride-was-created';
import { Ride } from './ride';
import { RideRequestId } from '../../../ride-request/domain/model/ride-request-id';

describe('Ride', () => {
  const rideId = RideId.fromString(uuid.v4());
  const driverId = UserId.fromString(uuid.v4());
  const rideRequestId = RideRequestId.fromString(uuid.v4());

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

  it('adds a new ride', () => {
    const ride = Ride.add(rideId, driverId);

    ride.addRideRequest(rideRequestId);

    expect(ride.rideRequestIds.some).toBeTruthy();
  });
});
