import { NumberOfPassengers } from './number-of-passengers';
import { InvalidNumberOfPassengersException } from '../exceptions'

describe('Number of Passengers', () => {
  it('should be created with the value if it is valid', () => {
    const vo = NumberOfPassengers.fromInteger(2);
    expect(vo.value).toBe(2);
  });

  it('should throw an exception if the value is invalid', () => {
    expect(() => NumberOfPassengers.fromInteger(-1)).toThrow(InvalidNumberOfPassengersException);
  });
});
