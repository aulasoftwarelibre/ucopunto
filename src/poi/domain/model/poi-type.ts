import { ValueObject } from "../../../core/domain";
import { PoiTypeNotValidError } from "../exception/poitype-not-valid-error";


export enum PoiTypes{
    Origin = 'Origin',
    Arrival = 'Arrival',
}

interface Props{
    value: PoiTypes
}

export class PointOfInterestType extends ValueObject<Props> {

    public static fromString(poitype: string): PointOfInterestType {
        if (poitype in PoiTypes === false) {
            throw PoiTypeNotValidError.withPoiType(poitype);
        }

        return new PointOfInterestType( {value: PoiTypes[poitype]});
    }

    public static origin(): PointOfInterestType{
        return new PointOfInterestType( {value: PoiTypes.Origin})
    }

    public static arrival(): PointOfInterestType{
        return new PointOfInterestType( {value: PoiTypes.Arrival})
    }       

    

    get value(): PoiTypes {
        return PoiTypes[this.props.value];
    }
}