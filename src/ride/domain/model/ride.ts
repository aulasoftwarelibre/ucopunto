import { AggregateRoot } from '../../../core/domain';
import { RideId } from './ride-id';
import { RideWasCreated } from '../event/ride-was-created';
import { UserId } from '../../../user/domain/model';
import { RideWasAccepted } from '../event/ride-was-accepted';
import { RideRequestId } from '../../../ride-request/domain/model/ride-request-id';

export class Ride extends AggregateRoot {
  private _rideId: RideId;
  private _driverId: UserId;
  private _rideRequestIds: RideRequestId[];

  private constructor() {
    super();
  }

  public static add(rideId: RideId, driverId: UserId) {
    const ride = new this();

    ride.apply(new RideWasCreated(rideId.value, driverId.value));

    return ride;
  }

  aggregateId(): string {
    return this._rideId.value;
  }

  get id(): RideId {
    return this._rideId;
  }

  get driverId(): UserId {
    return this._driverId;
  }

  addRideRequest(rideRequestId: RideRequestId) {
    this.apply(new RideWasAccepted(this.id.value, rideRequestId.value));
  }

  private onRideWasCreated(event: RideWasCreated) {
    this._rideId = RideId.fromString(event.id);
    this._driverId = UserId.fromString(event.driverId);
    this._rideRequestIds = [];
  }

  private onRideWasAccepted(event: RideWasAccepted) {
    this._rideRequestIds.push(RideRequestId.fromString(event.rideRequestId));
  }
}
