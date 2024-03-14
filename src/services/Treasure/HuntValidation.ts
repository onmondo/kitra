import { TTreasureValidation } from "./types";

export default class HuntValidation {
    private specs: {
        coordinates: string;
        distance: number;
        prize?: string;
    } 

    protected constructor(specs: TTreasureValidation) {
        this.specs = specs;
    }

    getTreasureValidation() {
        return this.specs;
    }

    public static HuntValidationBuilder = class HuntValidationBuilder {
        private specs: {
            coordinates: string;
            distance: number;
            prize?: string;
        }

        constructor() {
            this.specs = {
                coordinates: "",
                distance: 0
            }
        }

        setCoordinates(coordinates: string): HuntValidationBuilder {
            this.specs.coordinates = coordinates;
            return this;
        }

        setDistance(distance: number): HuntValidationBuilder {
            this.specs.distance = distance;
            return this;
        }

        setPrize(prize: string): HuntValidationBuilder {
            this.specs.prize = prize;
            return this
        }

        build(): HuntValidation {
            const huntValidation = new HuntValidation(this.specs);
            return huntValidation
        }
    }
}