import { CoordinateLongitude } from './poi-longitude';
import { LongitudeNotValidError } from '../exception/longitude-not-valid-error';

describe('CoordinateLongitude', () => {
  it('should be a valid longitude', () => {
    const longitude = CoordinateLongitude.fromNumber(60);

    expect(longitude.value).toBe(60);
  });

  it('should throw an exception', () => {
    const t = () => {
      const longitude = CoordinateLongitude.fromNumber(260);
    };

    expect(t).toThrow(LongitudeNotValidError);
  });
});
