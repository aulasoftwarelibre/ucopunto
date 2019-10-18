import { ValueObject } from '../../../core/domain';
import { EmptyFullnameError } from '../exception/empty-fullname.error';

interface Props {
  value: string;
}

export class Fullname extends ValueObject<Props> {
  static fromString(value: string): Fullname {
    if (value.length === 0) {
      throw new EmptyFullnameError();
    }

    return new this({ value });
  }

  get value(): string {
    return this.props.value;
  }
}
