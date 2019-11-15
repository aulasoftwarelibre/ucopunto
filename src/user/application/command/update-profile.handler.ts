import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { UserNotFoundError } from '../../domain/exception';
import { Fullname, Gender, UserId } from '../../domain/model';
import { USERS, Users } from '../../domain/repository';
import { UpdateProfileCommand } from './update-profile.command';

@CommandHandler(UpdateProfileCommand)
export class UpdateProfileHandler
  implements ICommandHandler<UpdateProfileCommand> {
  constructor(@Inject(USERS) private readonly users: Users) {}

  async execute(command: UpdateProfileCommand) {
    const userId = UserId.fromString(command.id);

    const user = await this.users.find(userId);
    if (user === null) {
      throw UserNotFoundError.withUserId(userId);
    }

    user.changeFullname(Fullname.fromString(command.fullname));
    user.changeGender(Gender.fromString(command.gender));

    this.users.save(user);
  }
}
