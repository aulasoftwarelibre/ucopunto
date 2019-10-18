import { InvalidNumberOfPassengersException } from '../exceptions';
import { ValueObject } from '../../../core/domain';

interface Props {
  value: number;
}

export class NumberOfPassengers extends ValueObject<Props> {
  static fromInteger(value: number): NumberOfPassengers {
    if (value < 1) {
      throw InvalidNumberOfPassengersException.withNumberOfPassengers(value);
    }
    return new this({ value: value });
  }

  get value() {
    return this.props.value;
  }
}
