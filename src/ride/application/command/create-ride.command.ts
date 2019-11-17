import { ICommand } from '@nestjs/cqrs';

export class CreateRideCommand implements ICommand {
  constructor(
    public readonly rideId: string,
    public readonly driverId: string,
  ) {}
}
