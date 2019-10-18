import { PointOfInterestType, PoiTypes } from "./poi-type";
import { PoiTypeNotValidError } from "../exception/poitype-not-valid-error";

describe('PoiType', () => {

  it('should be an arrival', () => {
    const arrival = PointOfInterestType.arrival();

    expect(arrival.value).toBe(PoiTypes.Arrival);
  });

  it('should be an origin', () => {
    const origin = PointOfInterestType.origin();

    expect(origin.value).toBe(PoiTypes.Origin);
  });

  it("should be an arrival from string", () =>{
    const arrival = PointOfInterestType.fromString("Arrival");

    expect(arrival.value).toBe(PoiTypes.Arrival);
  });

  it("should be an origin from string", () =>{
    const origin = PointOfInterestType.fromString("Origin");

    expect(origin.value).toBe(PoiTypes.Origin);
  });

  it('can not create an invalid type', () => {
    expect(() => PointOfInterestType.fromString('yy')).toThrow(PoiTypeNotValidError);
  });
});