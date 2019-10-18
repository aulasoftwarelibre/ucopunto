import { EmptyUsernameError } from '../exception/empty-username.error';
import { Username } from './username';

describe('Username', () => {
  it('creates a new username', () => {
    const username = Username.fromString('john');

    expect(username.value).toBe('john');
  });

  it('expects a username', () => {
    expect(() => Username.fromString('')).toThrow(EmptyUsernameError);
  });
});
