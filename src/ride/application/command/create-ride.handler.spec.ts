import { CreateRideHandler } from './create-ride.handler';
import { Rides, RIDES } from '../../domain/repository';
import {
  CheckDriverHasOpenRide,
  CHECK_DRIVER_HAS_OPEN_RIDE,
} from '../../domain/services';
import { RideId, Ride } from '../../domain/model';
import uuid = require('uuid');
import { UserId } from '../../../user/domain/model';
import { async } from 'rxjs/internal/scheduler/async';
import { TestingModule, Test } from '@nestjs/testing';
import { CommandBus } from '@nestjs/cqrs';
import { CreateRideCommand } from './create-ride.command';
import { RideRequestId } from '../../../ride-request/domain/model/ride-request-id';

describe('CreateRideHandler', () => {
  let command$: CreateRideHandler;

  const rides: Partial<Rides> = {};
  const checkDriverHasOpenRide: Partial<CheckDriverHasOpenRide> = {};

  const rideId = RideId.fromString(uuid.v4());
  const driverId = UserId.fromString(uuid.v4());

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateRideHandler,
        {
          provide: RIDES,
          useValue: rides,
        },
        {
          provide: CHECK_DRIVER_HAS_OPEN_RIDE,
          useValue: checkDriverHasOpenRide,
        },
      ],
    }).compile();

    command$ = module.get<CreateRideHandler>(CreateRideHandler);
    rides.find = jest.fn().mockResolvedValue(null);
    rides.save = jest.fn();
    checkDriverHasOpenRide.with = jest.fn().mockResolvedValue(null);
  });

  it('creates a new ride', async () => {
    await command$.execute(new CreateRideCommand(rideId.value, driverId.value));

    expect(rides.save).toHaveBeenCalledWith(Ride.add(rideId, driverId));
  });

  it('does not create duplicated ride id', async () => {
    rides.find = jest.fn().mockResolvedValue(Ride.add(rideId, driverId));

    await expect(
      command$.execute(new CreateRideCommand(rideId.value, driverId.value)),
    ).rejects.toThrowError();
  });

  it('does not create a ride if driver has one open', async () => {
    checkDriverHasOpenRide.with = jest.fn().mockResolvedValue(rideId);

    await expect(
      command$.execute(new CreateRideCommand(rideId.value, driverId.value)),
    ).rejects.toThrowError();
  });
});
