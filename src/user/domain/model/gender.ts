import { ValueObject } from '../../../core/domain';
import { GenderNotValidError } from '../exception';

export enum GenderTypes {
  Male = 'Male',
  Female = 'Female',
  Other = 'Other',
}

export type GenderTypesStrings = keyof typeof GenderTypes;

interface Props {
  value: GenderTypes;
}

export class Gender extends ValueObject<Props> {
  public static fromString(gender: string): Gender {
    if (gender in GenderTypes === false) {
      throw GenderNotValidError.withGender(gender);
    }
    return new Gender({ value: GenderTypes[gender] });
  }

  public static male(): Gender {
    return new Gender({ value: GenderTypes.Male });
  }

  public static female(): Gender {
    return new Gender({ value: GenderTypes.Female });
  }

  public static other(): Gender {
    return new Gender({ value: GenderTypes.Other });
  }

  get value(): GenderTypesStrings {
    return GenderTypes[this.props.value];
  }
}
