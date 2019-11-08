import { ValueObject } from '../../../core/domain';

interface Props {
  value: Date;
}

export class CreatedAt extends ValueObject<Props> {
  public static fromDate(value: Date): CreatedAt {
    return new this({ value });
  }

  get value() {
    return this.props.value;
  }
}
