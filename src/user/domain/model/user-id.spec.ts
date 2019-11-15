import { UserId } from './user-id';
import { User } from './user';
import { UserIdAlreadyRegisteredError } from '../exception';

describe('UserId', () => {
  const uuidA = '1061abe8-37e5-4623-8696-a9fd40797f73';
  const uuidB = 'f75dde03-2c8b-4e5a-89a2-ad22d52c18cf';
  const username = Username.fromString('johndoe');

  it('should be an uuid v4', () => {
    const vo = UserId.fromString(uuidA);

    expect(vo.value).toBe(uuidA);
  });

  it('should be unique' , () => {
    const userId = UserId.fromString(uuidA);
    const user = User.add(userId, username);
    
    expect(() => User.add(userId, username)).toThrow(UserIdAlreadyRegisteredError);
  });
});
