import { WaitingTimeInMinutes } from './waiting-time-in-minutes';
import { InvalidWaitingTimeInMinutesException } from '../exceptions';

describe('Waiting Time In Minutes', () => {
  it('should be created with the value if it is valid', () => {
    const vo = WaitingTimeInMinutes.fromInteger(2);
    expect(vo.value).toBe(2);
  });

  it('should throw an exception if the value is invalid', () => {
    expect(() => WaitingTimeInMinutes.fromInteger(-1)).toThrow(
      InvalidWaitingTimeInMinutesException,
    );
  });
});
