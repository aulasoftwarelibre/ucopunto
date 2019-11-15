import { AggregateRoot } from '@nestjs/cqrs';
import { RideRequestId } from './ride-request-id';
import { UserId } from '../../../user/domain/model';
import { Path } from './path';
import { Schedule } from './schedule';
import { State } from './state';
import { RideRequestWasCreated } from '../event/ride-request-was-created';
import { PointOfInterestId } from '../../../poi/domain/model/poi-id';
import { NumberOfPassengers } from './number-of-passengers';
import { CreatedAt } from './created-at';
import { WaitingTimeInMinutes } from './waiting-time-in-minutes';
import { RideRequestWasAccepted } from '../event/ride-request-was-accepted';

export class RideRequest extends AggregateRoot {
  private _rideRequestId: RideRequestId;
  private _requesterId: UserId;
  private _path: Path;
  private _schedule: Schedule;
  private _state: State;

  private constructor() {
    super();
  }

  public static add(
    rideRequestId: RideRequestId,
    requesterId: UserId,
    path: Path,
    schedule: Schedule,
  ) {
    const rideRequest = new this();

    rideRequest.apply(
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

    return rideRequest;
  }

  aggregateId() {
    return this._rideRequestId.value;
  }

  get id(): RideRequestId {
    return this._rideRequestId;
  }

  get requesterId(): UserId {
    return this._requesterId;
  }

  get path(): Path {
    return this._path;
  }

  get schedule(): Schedule {
    return this._schedule;
  }

  get state(): State {
    return this._state;
  }

  acceptRideRequest() {
    if (this.state.equals(State.closed())) {
      return;
    }

    this.apply(new RideRequestWasAccepted(this.id.value));
  }

  private onRideRequestWasCreated(event: RideRequestWasCreated) {
    this._rideRequestId = RideRequestId.fromString(event.id);
    this._requesterId = UserId.fromString(event.requesterId);
    this._path = Path.with(
      PointOfInterestId.fromString(event.originId),
      event.arrivalId.map(arrival => PointOfInterestId.fromString(arrival)),
      NumberOfPassengers.fromInteger(event.numberOfPassenger),
    );
    this._schedule = Schedule.with(
      CreatedAt.fromDate(event.createdAt),
      WaitingTimeInMinutes.fromInteger(event.waitingTimeInMinutes),
    );
    this._state = State.open();
  }

  private onRideRequestWasAccepted(event: RideRequestWasAccepted) {
    this._state = State.closed();
  }
}
