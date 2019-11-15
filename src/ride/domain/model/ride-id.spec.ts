import { RideId } from './ride-id';

describe('RideId', () => {
  const uuidA = '1061abe8-37e5-4623-8696-a9fd40797f73';

  it('should be an uuid v4', () => {
    const vo = RideId.fromString(uuidA);

    expect(vo.value).toBe(uuidA);
  });
});

