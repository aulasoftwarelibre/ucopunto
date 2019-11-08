import { DomainEvent } from "../../../core/domain";

export class RideRequestWasAccepted implements DomainEvent {
    constructor(
        public readonly id: string
    ) {}
}