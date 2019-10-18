import { PointOfInterestId } from '../../../poi/domain/model/poi-id';
import uuid = require('uuid');
import { NumberOfPassengers } from './number-of-passengers';
import { Path } from './path';

describe('Path', () => {
  const origin: PointOfInterestId = PointOfInterestId.fromString(uuid());
  const arrivals: PointOfInterestId[] = [
    PointOfInterestId.fromString(uuid()),
    PointOfInterestId.fromString(uuid()),
    PointOfInterestId.fromString(uuid()),
  ];
  const numberOfPassengers: NumberOfPassengers = NumberOfPassengers.fromInteger(
    2,
  );

  it('should be constructed correctly', () => {
    const vo: Path = Path.with(origin, arrivals, numberOfPassengers);
    expect(vo.origin).toBe(origin);
    expect(vo.arrivals).toBe(arrivals);
    expect(vo.numberOfPassengers).toBe(numberOfPassengers);
  });
});
