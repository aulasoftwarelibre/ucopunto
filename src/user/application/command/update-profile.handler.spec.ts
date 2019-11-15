import { Test, TestingModule } from '@nestjs/testing';
import uuid = require('uuid');

import { UserNotFoundError } from '../../domain/exception';
import { Fullname, Gender, User, UserId } from '../../domain/model';
import { USERS, Users } from '../../domain/repository';
import { UpdateProfileCommand } from './update-profile.command';
import { UpdateProfileHandler } from './update-profile.handler';

describe('UpdateProfileHandler', () => {
  let command$: UpdateProfileHandler;

  const users: Partial<Users> = {};
  const user: Partial<User> = {};

  const userId = UserId.fromString(uuid.v4());
  const fullname = Fullname.fromString('John Doe');
  const gender = Gender.male();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateProfileHandler,
        {
          provide: USERS,
          useValue: users,
        },
      ],
    }).compile();

    command$ = module.get<UpdateProfileHandler>(UpdateProfileHandler);
    users.find = jest.fn().mockResolvedValue(user);
    users.save = jest.fn();
    user.changeFullname = jest.fn();
    user.changeGender = jest.fn();
  });

  it('changes user profile', async () => {
    await command$.execute(
      new UpdateProfileCommand(userId.value, fullname.value, gender.value),
    );

    expect(user.changeFullname).toHaveBeenCalledWith(fullname);
    expect(user.changeGender).toHaveBeenCalledWith(gender);
    expect(users.save).toHaveBeenCalledWith(user);
  });

  it('check users exists', async () => {
    users.find = jest.fn().mockResolvedValue(null);

    await expect(
      command$.execute(
        new UpdateProfileCommand(userId.value, fullname.value, gender.value),
      ),
    ).rejects.toThrowError(UserNotFoundError.withUserId(userId));

    expect(users.save).toHaveBeenCalledTimes(0);
  });
});
