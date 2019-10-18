import { ValueObject } from "../../../core/domain";
import { CoordinateLatitude } from "./poi-latitude";
import { CoordinateLongitude } from "./poi-longitude";
import { CoordinateNotValidError } from "../exception/coordinates-not-valid-error";


interface Props{
    latitude: CoordinateLatitude,
    longitude: CoordinateLongitude,
}

export class PointOfInterestCoordinates extends ValueObject<Props>{

    public static FromArray(coordinates: Array<number>): PointOfInterestCoordinates{
        if (coordinates.length !== 2){
            throw CoordinateNotValidError.withCoordinate(coordinates);
        }

        return new PointOfInterestCoordinates({
            latitude: CoordinateLatitude.FromNumber(coordinates[0]),
            longitude: CoordinateLongitude.FromNumber(coordinates[1])
        })
    }

    get latitude(): number{
        return this.props.latitude.value;
    }


    get longitude(): number{
        return this.props.longitude.value;
    }

}