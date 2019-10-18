import uuid = require("uuid");
import { version } from "uuid-validate";

import { Id } from "../../../core/domain";

export class UserId extends Id {
  static generate(): UserId {
    return new UserId(uuid());
  }

  public static fromString(id: string): UserId {
    if (version(id) !== 4) {
      throw new Error('Invalid Id');
    }

    return new UserId(id);
  }

  get value(): string {
    return this.props.value;
  }
}
