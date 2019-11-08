import { DomainEvent } from '../../core/domain';

export class RideWasCreated implements DomainEvent {
  constructor(public readonly id: string, public readonly driverId: string) {}
}
