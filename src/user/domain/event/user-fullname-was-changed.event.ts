import { DomainEvent } from '../../../core/domain';

export class UserFullnameWasChanged implements DomainEvent {
  constructor(public readonly id: string, public readonly fullname: string) {}
}
