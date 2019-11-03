import { ValueObject } from '../../../core/domain';
import { LongitudeNotValidError } from '../exception/longitude-not-valid-error';

interface Props {
  value: number;
}

export class CoordinateLongitude extends ValueObject<Props> {
  public static FromNumber(longitude: number): CoordinateLongitude {
    if (Math.abs(longitude) > 180) {
      throw LongitudeNotValidError.withLongitude(longitude);
    }

    return new CoordinateLongitude({ value: longitude });
  }

  get value(): number {
    return this.props.value;
  }
}
