import { State } from './state';
import { InvalidRideRequestStateError } from '../exceptions/invalid-ride-request-state.error';

describe('State', () => {
  let vo: State;

  it('should be created if the value is valid', () => {
    vo = State.fromString('Open');
    expect(vo.value).toBe('Open');
  });

  it('should throw an exception if the value is invalid', () => {
    expect(() => State.fromString('invalid')).toThrow(
      InvalidRideRequestStateError,
    );
  });

  it('should create an Open State', () => {
    vo = State.open();
    expect(vo.value).toBe('Open');
  });

  it('should create a Close State', () => {
    vo = State.closed();
    expect(vo.value).toBe('Closed');
  });
});
