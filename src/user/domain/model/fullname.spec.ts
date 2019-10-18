import { EmptyFullnameError } from '../exception/empty-fullname.error';
import { Fullname } from './fullname';

describe('Fullname', () => {
  it('creates a new fullname', () => {
    const fullname = Fullname.fromString('john');

    expect(fullname.value).toBe('john');
  });

  it('expects the fullname', () => {
    expect(() => Fullname.fromString('')).toThrow(EmptyFullnameError);
  });
});
