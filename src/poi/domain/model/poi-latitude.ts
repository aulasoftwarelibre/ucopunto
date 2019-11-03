import { ValueObject } from '../../../core/domain';
import { LatitudeNotValidError } from '../exception/latitude-not-valid-error';

interface Props {
  value: number;
}

export class CoordinateLatitude extends ValueObject<Props> {
  public static FromNumber(latitude: number): CoordinateLatitude {
    if (Math.abs(latitude) > 90) {
      throw LatitudeNotValidError.withLatitude(latitude);
    }

    return new CoordinateLatitude({ value: latitude });
  }

  get value(): number {
    return this.props.value;
  }
}
