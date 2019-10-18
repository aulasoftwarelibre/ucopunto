import uuid = require('uuid');
import { version } from 'uuid-validate';

import { Id } from '../../../core/domain';

export class PointOfInterestId extends Id {
  static generate(): PointOfInterestId {
    return new PointOfInterestId(uuid());
  }

  public static fromString(id: string): PointOfInterestId {
    if (version(id) !== 4) {
      throw new Error('Invalid Id');
    }

    return new PointOfInterestId(id);
  }

  get value(): string {
    return this.props.value;
  }
}
