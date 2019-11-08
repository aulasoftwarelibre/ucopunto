import { CoordinateNotValidError } from '../exception/coordinates-not-valid-error';
import { PointOfInterestCoordinates } from './poi-coordinates';
import { CoordinateLatitude } from './poi-latitude';
import { CoordinateLongitude } from './poi-longitude';

describe('PoiCoordinates', () => {
  it('should return coordinates', () => {
    const latitude = CoordinateLatitude.fromNumber(23.8);
    const longitude = CoordinateLongitude.fromNumber(67.7);

    const coordinates = PointOfInterestCoordinates.withLatitudeAndLongitude(
      latitude,
      longitude,
    );
    expect(coordinates.latitude.value).toBe(23.8);
    expect(coordinates.longitude.value).toBe(67.7);
  });
});
