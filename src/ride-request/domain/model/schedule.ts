import { CreatedAt } from './created-at';
import { WaitingTimeInMinutes } from './waiting-time-in-minutes';
import { ValueObject } from '../../../core/domain';

interface Props {
  createdAt: CreatedAt;
  waitingTimeInMinutes: WaitingTimeInMinutes;
}

export class Schedule extends ValueObject<Props> {
  public static with(
    createdAt: CreatedAt,
    waitingTimeInMinutes: WaitingTimeInMinutes,
  ) {
    return new this({ createdAt, waitingTimeInMinutes });
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get waitingTimeInMinutes() {
    return this.props.waitingTimeInMinutes;
  }

  public equals(schedule: Schedule): boolean {
    if (!this.createdAt.equals(schedule.createdAt)) {
      return false;
    }
    if (!this.waitingTimeInMinutes.equals(schedule.waitingTimeInMinutes)) {
      return false;
    }
    return true;
  }
}
