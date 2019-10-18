import { PointOfInterestName } from "./poi-name";

describe('Poi Name', () => {

  it('should be a string', () => {
    const vo = PointOfInterestName.fromString("John Smith");

    expect(vo.value).toBe("John Smith");
  });

  it('should not be a empty string', () => {
    const t = () => {const vo = PointOfInterestName.fromString("");};

    expect(t).toThrowError();
  });
});