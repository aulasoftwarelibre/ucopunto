import { RideRequestId } from './ride-request-id';
import { UserId } from '../../../user/domain/model';
import { Path } from './path';
import { Schedule } from './schedule';
import { State } from './state';
import uuid = require('uuid');
import { PointOfInterestId } from '../../../poi/domain/model/poi-id';
import { NumberOfPassengers } from './number-of-passengers';
import { CreatedAt } from './created-at';
import { WaitingTimeInMinutes } from './waiting-time-in-minutes';
import { RideRequest } from './ride-request';
import { RideRequestWasCreated } from '../event/ride-request-was-created';
import { RideRequestWasAccepted } from '../event/ride-request-was-accepted';

describe('Ride Request', () => {
  const rideRequestId: RideRequestId = RideRequestId.fromString(uuid.v4());
  const requesterId: UserId = UserId.fromString(uuid.v4());
  const path: Path = Path.with(
    PointOfInterestId.fromString(uuid.v4()),
    [PointOfInterestId.fromString(uuid.v4())],
    NumberOfPassengers.fromInteger(2),
  );
  const schedule: Schedule = Schedule.with(
    CreatedAt.fromDate(new Date('2019-11-15T17:43:50')),
    WaitingTimeInMinutes.fromInteger(10),
  );

  const rideRequest: RideRequest = RideRequest.add(
    rideRequestId,
    requesterId,
    path,
    schedule,
  );

  it('can be created', () => {
    expect(rideRequest.getUncommittedEvents()).toContainEqual(
      new RideRequestWasCreated(
        rideRequestId.value,
        requesterId.value,
        path.origin.value,
        path.numberOfPassengers.value,
        path.arrivals.map(arrival => arrival.value),
        schedule.createdAt.value,
        schedule.waitingTimeInMinutes.value,
      ),
    );
  });

  it('has an id', () => {
    expect(rideRequest.id).toStrictEqual(rideRequestId);
  });

  it('has a requester id', () => {
    expect(rideRequest.requesterId).toStrictEqual(requesterId);
  });

  it('has a path', () => {
    expect(rideRequest.path.equals(path)).toBeTruthy();
  });

  it('has a schedule', () => {
    expect(rideRequest.schedule.equals(schedule)).toBeTruthy();
  });

  it('has open state', () => {
    expect(rideRequest.state.equals(State.open()));
  });

  it('can be accepted', () => {
    rideRequest.acceptRideRequest();

    expect(rideRequest.getUncommittedEvents()).toContainEqual(
      new RideRequestWasAccepted(rideRequestId.value),
    );
    expect(rideRequest.state.equals(State.closed())).toBeTruthy();
  });

  it('ignores accept when it is closed', () => {
    rideRequest.commit();
    rideRequest.acceptRideRequest();
    expect(rideRequest).not.toContainEqual(
      new RideRequestWasAccepted(rideRequestId.value),
    );
  });
});
