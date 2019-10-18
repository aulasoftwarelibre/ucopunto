import { PointOfInterestCoordinates } from "./poi-coordinates";
import { CoordinateNotValidError } from "../exception/coordinates-not-valid-error";


describe("PoiCoordinates", () => {

    it("should return coordinates", () => {
        const coordinates = PointOfInterestCoordinates.FromArray([23.8, 67.7])

        expect(coordinates.latitude).toBe(23.8);
        expect(coordinates.longitude).toBe(67.7);
    });


    it("should thrown an exception", () => {
        const t = () => {PointOfInterestCoordinates.FromArray([23.8, 67.7, 12.3])};

        expect(t).toThrow(CoordinateNotValidError);
    });

    it("should thrown an exception", () => {
        const t = () => {PointOfInterestCoordinates.FromArray([23.8])};

        expect(t).toThrow(CoordinateNotValidError);
    });
})