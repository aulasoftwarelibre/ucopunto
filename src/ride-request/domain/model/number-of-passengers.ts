import { InvalidNumberOfPassengersException } from '../exceptions';
import { ValueObject } from '../../../core/domain';


interface Props {
  value: number;
}

export class NumberOfPassengers extends ValueObject<Props> {
  static fromString(value: string): NumberOfPassengers {
    const nPassengers: number = parseInt(value, 10);
    if (nPassengers < 1) {
      throw InvalidNumberOfPassengersException.withNumberOfPassengers(nPassengers);
    }
    return new this({ value: nPassengers });
  }

  get value() {
    return this.props.value;
  }
}
