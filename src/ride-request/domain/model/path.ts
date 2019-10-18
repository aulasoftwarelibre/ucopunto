import { ValueObject } from "../../../core/domain";
import { PointOfInterestId } from "../../../poi/domain/model/poi-id";
import { NumberOfPassengers } from "./number-of-passengers";

interface Props {
    origin: PointOfInterestId
    arrivals: PointOfInterestId[]
    numberOfPassengers: NumberOfPassengers
}

export class Path extends ValueObject<Props> {
    static with(
        origin: PointOfInterestId,
        arrivals: PointOfInterestId[],
        numberOfPassengers: NumberOfPassengers,
    ): Path {
        return new this({origin, arrivals, numberOfPassengers});
    }

    get origin(): PointOfInterestId {
        return this.props.origin;
    }

    get arrivals(): PointOfInterestId[] {
        return this.props.arrivals;
    }

    get numberOfPassengers(): NumberOfPassengers {
        return this.props.numberOfPassengers;
    }
}