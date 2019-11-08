import { DomainEvent } from '../../../core/domain';

export class PointWasAdded implements DomainEvent {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly type: string,
    public readonly latitude: number,
    public readonly longitude: number,
  ) {}
}
