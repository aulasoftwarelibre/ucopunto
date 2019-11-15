import { ICommand } from '@nestjs/cqrs';

import { GenderTypesStrings } from '../../domain/model';

export class UpdateProfileCommand implements ICommand {
  constructor(
    public readonly id: string,
    public readonly fullname: string,
    public readonly gender: GenderTypesStrings,
  ) {}
}
