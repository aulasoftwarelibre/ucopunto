import uuid = require("uuid");
import { version } from "uuid-validate";
import { Id } from "../../../core/domain";

export class RideRequestId extends Id{
    static generate(): RideRequestId {
        return new RideRequestId(uuid());
    }

    public static fromString(id: string): RideRequestId {
        if (version(id) !== 4) {
            throw new Error('Invalid Id');
        }

        return new RideRequestId(id);
    }

    get value(): string {
        return this.props.value;
    }
}