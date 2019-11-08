import { DomainEvent } from '../../../core/domain';

export class RideRequestWasCreated implements DomainEvent {
  constructor(
    public readonly id: string,
    public readonly requesterId: string,
    public readonly originId: string,
    public readonly numberOfPassenger: number,
    public readonly arrivalId: string[],
    public readonly createdAt: Date,
    public readonly waitingTimeInMinutes: number,
  ) {}
}
