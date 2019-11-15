import { AggregateRoot } from '../../../core/domain';
import { PointOfInterestId } from './poi-id';
import { PointOfInterestName } from './poi-name';
import { PointOfInterestType } from './poi-type';
import { PointOfInterestCoordinates } from './poi-coordinates';
import { userInfo } from 'os';
import { PointWasAdded } from '../event/point-was-added';
import { CoordinateLatitude } from './poi-latitude';
import { CoordinateLongitude } from './poi-longitude';

export class PointOfInterest extends AggregateRoot {
  private _poiId: PointOfInterestId;
  private _name: PointOfInterestName;
  private _type: PointOfInterestType;
  private _coordinates: PointOfInterestCoordinates;

  private constructor() {
    super();
  }

  public static add(
    poiId: PointOfInterestId,
    name: PointOfInterestName,
    type: PointOfInterestType,
    coordinates: PointOfInterestCoordinates,
  ): PointOfInterest {
    const poi = new this();

    poi.apply(
      new PointWasAdded(
        poiId.value,
        name.value,
        type.value,
        coordinates.latitude.value,
        coordinates.longitude.value,
      ),
    );

    return poi;
  }

  aggregateId(): string {
    return this._poiId.value;
  }

  get id(): PointOfInterestId {
    return this._poiId;
  }

  get name(): PointOfInterestName {
    return this._name;
  }

  get type(): PointOfInterestType {
    return this._type;
  }

  get coordinates(): PointOfInterestCoordinates {
    return this._coordinates;
  }

  private onPointWasAdded(event: PointWasAdded) {
    this._poiId = PointOfInterestId.fromString(event.id);
    this._name = PointOfInterestName.fromString(event.name);
    this._type = PointOfInterestType.fromString(event.type);
    this._coordinates = PointOfInterestCoordinates.withLatitudeAndLongitude(
      CoordinateLatitude.fromNumber(event.latitude),
      CoordinateLongitude.fromNumber(event.longitude),
    );
  }
}
