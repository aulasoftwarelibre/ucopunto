import uuid = require('uuid');

import { AggregateRoot } from '../../../core/domain';
import { PointOfInterestId } from './poi-id';
import { PointOfInterestName } from './poi-name';
import { PointOfInterestType } from './poi-type';
import { PointOfInterestCoordinates } from './poi-coordinates';
import { userInfo } from 'os';
import { PointWasAdded } from '../event/point-was-added';
import { CoordinateLatitude } from './poi-latitude';
import { CoordinateLongitude } from './poi-longitude';
import { PointOfInterest } from './poi';

describe('Poi', () => {
  const poiId = PointOfInterestId.fromString(uuid.v4());
  const poiName = PointOfInterestName.fromString('Monument');
  const poiType = PointOfInterestType.origin();
  const poiCoordinates = PointOfInterestCoordinates.withLatitudeAndLongitude(CoordinateLatitude.fromNumber(0),  CoordinateLongitude.fromNumber(0))


  it('can be created', () => {
    const poi = PointOfInterest.add(poiId, poiName, poiType, poiCoordinates);

    expect(poi.getUncommittedEvents()).toContainEqual(
      new PointWasAdded( poiId.value,
        poiName.value,
        poiType.value,
        poiCoordinates.latitude.value,
        poiCoordinates.longitude.value,),
    );
  });

  it('has an id', () => {
    const poi = PointOfInterest.add(poiId, poiName, poiType, poiCoordinates);    

    expect(poi.id.equals(poiId)).toBeTruthy();
  });

  it('has a name', () => {
    const poi = PointOfInterest.add(poiId, poiName, poiType, poiCoordinates);

    expect(poi.name.equals(poiName)).toBeTruthy();
  });

  it('has a type', () => {
    const poi = PointOfInterest.add(poiId, poiName, poiType, poiCoordinates);    

    expect(poi.type.equals(poiType)).toBeTruthy();    
  });

  it('has coordinates', () => {
    const poi = PointOfInterest.add(poiId, poiName, poiType, poiCoordinates);  

    expect(poi.coordinates.equals(poiCoordinates)).toBeTruthy();    
  });
});
