import { DomainEvent } from '../../../core/domain';

export class RideWasAccepted implements DomainEvent {
  constructor(
    public readonly id: string,
    public readonly rideRequestId: string,
  ) {}
}
