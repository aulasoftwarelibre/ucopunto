import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import {
  UserIdAlreadyRegisteredError,
  UsernameAlreadyTakenError,
} from '../../domain/exception';
import { User, UserId, Username } from '../../domain/model';
import { USERS, Users } from '../../domain/repository/users';
import {
  CHECK_UNIQUE_USERNAME,
  CheckUniqueUsername,
} from '../../domain/services';
import { RegisterUserCommand } from './register-user.command';

@CommandHandler(RegisterUserCommand)
export class RegisterUserHandler
  implements ICommandHandler<RegisterUserCommand> {
  constructor(
    @Inject(USERS) private readonly users: Users,
    @Inject(CHECK_UNIQUE_USERNAME)
    private readonly checkUniqueUsername: CheckUniqueUsername,
  ) {}

  async execute(command: RegisterUserCommand) {
    const userId = UserId.fromString(command.userId);
    const username = Username.fromString(command.username);

    if ((await this.users.find(userId)) instanceof User) {
      throw UserIdAlreadyRegisteredError.withUserId(userId);
    }

    if ((await this.checkUniqueUsername.with(username)) instanceof UserId) {
      throw UsernameAlreadyTakenError.withUsername(username);
    }

    const user = User.add(userId, username);

    this.users.save(user);
  }
}
