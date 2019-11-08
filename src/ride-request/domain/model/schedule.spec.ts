import { Schedule } from './schedule';
import { CreatedAt } from './created-at';
import { WaitingTimeInMinutes } from './waiting-time-in-minutes';

describe('Schedule', () => {
  const newDate: Date = new Date('2019-11-8T17:08:20');
  const createdAt: CreatedAt = CreatedAt.fromDate(newDate);
  const waitingTimeInMinutes: WaitingTimeInMinutes = WaitingTimeInMinutes.fromInteger(
    10,
  );

  it('should be created with CreatedAt and Waiting Time In Minutes', () => {
    const vo = Schedule.with(createdAt, waitingTimeInMinutes);

    expect(vo.createdAt.value).toBe(newDate);
    expect(vo.waitingTimeInMinutes.value).toBe(10);
  });
});
