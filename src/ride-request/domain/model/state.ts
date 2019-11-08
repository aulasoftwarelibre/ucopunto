import { ValueObject } from '../../../core/domain';
import { InvalidRideRequestStateError } from '../exceptions/invalid-ride-request-state.error';

export enum ValidStates {
  Open = 'Open',
  Closed = 'Closed',
}

interface Props {
  value: ValidStates;
}

export class State extends ValueObject<Props> {
  public static fromString(value: string): State {
    if (value in ValidStates === false) {
      throw InvalidRideRequestStateError.withRideRequestState(value);
    }
    return new State({ value: ValidStates[value] });
  }

  public static open(): State {
    return new State({ value: ValidStates.Open });
  }

  public static closed(): State {
    return new State({ value: ValidStates.Closed });
  }

  get value(): ValidStates {
    return this.props.value;
  }
}
