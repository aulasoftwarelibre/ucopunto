export class PoiTypeNotValidError extends Error {
  static withPoiType(poitype: string): PoiTypeNotValidError {
    return new this(`PoiType ${poitype} not valid.`);
  }
}
