import { RideId } from "./ride-id";

describe('RideId', () => {
  const uuidA = '1061abe8-37e5-4623-8696-a9fd40797f73';
  const uuidB = 'f75dde03-2c8b-4e5a-89a2-ad22d52c18cf';

  it('should be an uuid v4', () => {
    const vo = RideId.fromString(uuidA);

    expect(vo.value).toBe(uuidA);
  });
});
