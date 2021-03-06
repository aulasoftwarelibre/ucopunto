import { CoordinateLatitude } from './poi-latitude';
import { LatitudeNotValidError } from '../exception/latitude-not-valid-error';

describe('CoordinateLatitude', () => {
  it('should be a valid latitude', () => {
    const latitude = CoordinateLatitude.fromNumber(60);

    expect(latitude.value).toBe(60);
  });

  it('should throw an exception', () => {
    const t = () => {
      const latitude = CoordinateLatitude.fromNumber(160);
    };

    expect(t).toThrow(LatitudeNotValidError);
  });
});
