import { ValueObject } from '../../../core/domain';
import { CoordinateLatitude } from './poi-latitude';
import { CoordinateLongitude } from './poi-longitude';
import { CoordinateNotValidError } from '../exception/coordinates-not-valid-error';

interface Props {
  latitude: CoordinateLatitude;
  longitude: CoordinateLongitude;
}

export class PointOfInterestCoordinates extends ValueObject<Props> {
  public static withLatitudeAndLongitude(
    latitude: CoordinateLatitude,
    longitude: CoordinateLongitude,
  ): PointOfInterestCoordinates {
    return new PointOfInterestCoordinates({ latitude, longitude });
  }

  get latitude(): CoordinateLatitude {
    return this.props.latitude;
  }

  get longitude(): CoordinateLongitude {
    return this.props.longitude;
  }

  equals(coordinates: PointOfInterestCoordinates): boolean {
    if (
      this.latitude.value == coordinates.latitude.value &&
      this.longitude.value == coordinates.longitude.value
    ) {
      return true;
    }
    return false;
  }
}
