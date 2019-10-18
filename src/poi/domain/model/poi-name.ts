import { ValueObject } from "../../../core/domain";


interface NameProps {
    value: string;
}

export class PointOfInterestName extends ValueObject<NameProps> {

    public static fromString(name: string): PointOfInterestName {
        if( name.length === 0){
            throw new Error('Invalid Name');
        }
        return new PointOfInterestName({ value: name });
    }


    get value(): string {
        return this.props.value;
    }
}