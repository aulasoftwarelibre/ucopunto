import { Ride, RideId } from '../model';

export interface Rides {
    find(rideId: RideId): Promise<Ride> | null;
    nextIdentity(): RideId;
    save(ride: Ride): void; 
}

export const RIDES = 'RIDES';