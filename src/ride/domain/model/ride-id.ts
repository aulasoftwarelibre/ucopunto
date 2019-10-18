import uuid = require("uuid");
import { version } from "uuid-validate";

import { Id } from "../../../core/domain";

export class RideId extends Id {
  static generate(): RideId {
    return new RideId(uuid());
  }

  public static fromString(id: string): RideId {
    if (version(id) !== 4) {
      throw new Error('Invalid Id');
    }

    return new RideId(id);
  }

  get value(): string {
    return this.props.value;
  }
}
