import { PointOfInterestName } from "./poi-name";

describe('Poi Name', () => {

  it('should be a string', () => {
    const vo = PointOfInterestName.fromString("Hola Caracola");

    expect(vo.value).toBe("Hola Caracola");
  });

  it('should not be a empty string', () => {
    const t = () => {const vo = PointOfInterestName.fromString("");};

    expect(t).toThrowError();
  });
});