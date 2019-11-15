import { ValueObject } from '../../../core/domain';
import { PointOfInterestId } from '../../../poi/domain/model/poi-id';
import { NumberOfPassengers } from './number-of-passengers';

interface Props {
  origin: PointOfInterestId;
  arrivals: PointOfInterestId[];
  numberOfPassengers: NumberOfPassengers;
}

export class Path extends ValueObject<Props> {
  static with(
    origin: PointOfInterestId,
    arrivals: PointOfInterestId[],
    numberOfPassengers: NumberOfPassengers,
  ): Path {
    return new this({ origin, arrivals, numberOfPassengers });
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

  private arrivalsAreEqual(path: Path) {
    return (
      this.arrivals.every(x => {
        return path.arrivals.find(y => x.equals(y)) !== undefined;
      }) &&
      path.arrivals.every(x => {
        return this.arrivals.find(y => x.equals(y)) !== undefined;
      })
    );
  }

  public equals(path: Path): boolean {
    if (!this.origin.equals(path.origin)) {
      return false;
    }

    if (!this.arrivalsAreEqual(path)) {
      return false;
    }

    if (!this.numberOfPassengers.equals(path.numberOfPassengers)) {
      return false;
    }
    return true;
  }
}
