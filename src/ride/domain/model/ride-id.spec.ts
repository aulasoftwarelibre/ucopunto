import { Ride } from './ride';
import { RideId } from './ride-id';
import { UserId } from '../../../user/domain/model/user-id';
import { RideIdAlreadyRegisteredError } from '../exception';

describe('RideId', () => {
  const uuidA = '1061abe8-37e5-4623-8696-a9fd40797f73';
  const uuidB = 'f75dde03-2c8b-4e5a-89a2-ad22d52c18cf';

  it('should be an uuid v4', () => {
    const vo = RideId.fromString(uuidA);

    expect(vo.value).toBe(uuidA);
  });

  it('should be unique' , () => {
    const rideId = RideId.fromString(uuidA);
    const driverId = UserId.fromString(uuidB);
    const ride = Ride.add(rideId, driverId);
    
    expect(() => Ride.add(rideId, driverId)).toThrow(RideIdAlreadyRegisteredError);
  });
});
