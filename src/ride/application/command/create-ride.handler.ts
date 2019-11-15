import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreateRideCommand } from "./create-ride.command";
import { Inject } from "@nestjs/common";
import { Rides, RIDES } from "../../domain/repository/rides";
import { CHECK_DRIVER_HAS_OPEN_RIDE, CheckDriverHasOpenRide } from "../../domain/services/check-driver-has-open-ride";
import { RideId, Ride } from "../../domain/model";
import { UserId } from "../../../user/domain/model";


@CommandHandler(CreateRideCommand)
export class CreateRideHandler implements ICommandHandler<CreateRideCommand> {
    constructor(
        @Inject(RIDES) private readonly rides: Rides,
        @Inject(CHECK_DRIVER_HAS_OPEN_RIDE)
        private readonly checkDriverHasOpenRide: CheckDriverHasOpenRide, 
    ) {}

    async execute(command: CreateRideCommand) {
        const rideId = RideId.fromString(command.rideId);
        const driverId = UserId.fromString(command.driverId);

        if((await this.rides.find(rideId)) instanceof Ride){
            throw new Error("Ride already exists"); 
        }

        if((await this.checkDriverHasOpenRide.with(driverId)) instanceof RideId){
            throw new Error("Driver has another ride");
        }

        const ride = Ride.add(rideId, driverId);

        this.rides.save(ride);

    }
}