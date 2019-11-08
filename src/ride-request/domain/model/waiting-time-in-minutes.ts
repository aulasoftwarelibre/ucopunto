import { InvalidWaitingTimeInMinutesException } from '../exceptions';
import { ValueObject } from '../../../core/domain';

interface Props {
  value: number;
}

export class WaitingTimeInMinutes extends ValueObject<Props> {
  public static fromInteger(value: number): WaitingTimeInMinutes {
    if (value <= 0) {
      throw InvalidWaitingTimeInMinutesException.withWaitingTimeInMinutes(
        value,
      );
    }
    return new this({ value });
  }
  get value() {
    return this.props.value;
  }
}
