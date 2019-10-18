import { DomainEvent } from '../../../core/domain';

export class UserGenderWasChanged implements DomainEvent {
  constructor(public readonly id: string, public readonly gender: string) {}
}
