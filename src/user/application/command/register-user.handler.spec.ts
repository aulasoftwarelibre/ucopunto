import { Test, TestingModule } from '@nestjs/testing';
import uuid = require('uuid');

import {
  UserIdAlreadyRegisteredError,
  UsernameAlreadyTakenError,
} from '../../domain/exception';
import { User, UserId, Username } from '../../domain/model';
import { USERS, Users } from '../../domain/repository';
import {
  CHECK_UNIQUE_USERNAME,
  CheckUniqueUsername,
} from '../../domain/services';
import { RegisterUserCommand } from './register-user.command';
import { RegisterUserHandler } from './register-user.handler';

describe('RegisterUserHandler', () => {
  let command$: RegisterUserHandler;

  const users: Partial<Users> = {};
  const checkUniqueUsername: Partial<CheckUniqueUsername> = {};

  const userId = UserId.fromString(uuid.v4());
  const username = Username.fromString('johndoe');

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RegisterUserHandler,
        {
          provide: USERS,
          useValue: users,
        },
        {
          provide: CHECK_UNIQUE_USERNAME,
          useValue: checkUniqueUsername,
        },
      ],
    }).compile();

    command$ = module.get<RegisterUserHandler>(RegisterUserHandler);
    users.find = jest.fn().mockResolvedValue(null);
    users.save = jest.fn();
    checkUniqueUsername.with = jest.fn().mockResolvedValue(null);
  });

  it('creates a new user', async () => {
    await command$.execute(
      new RegisterUserCommand(userId.value, username.value),
    );

    expect(users.save).toHaveBeenCalledWith(User.add(userId, username));
  });

  it('does not create duplicated user id', async () => {
    users.find = jest.fn().mockResolvedValue(User.add(userId, username));

    await expect(
      command$.execute(new RegisterUserCommand(userId.value, username.value)),
    ).rejects.toThrowError(UserIdAlreadyRegisteredError.withUserId(userId));
  });

  it('does not create duplicated username', async () => {
    checkUniqueUsername.with = jest.fn().mockResolvedValue(userId);

    await expect(
      command$.execute(new RegisterUserCommand(userId.value, username.value)),
    ).rejects.toThrowError(UsernameAlreadyTakenError.withUsername(username));
  });
});
