import { getDistance } from "geolib";
import { TreasureMap } from "./TreasureMap";
import { TCoordinates } from "./types";
import { GeolibInputCoordinates } from "geolib/es/types";
import { intersectionBy } from "lodash";
import { Hunter } from "./Hunter";

export default class TreasureHunter extends Hunter {
    protected async findTreasure(range: number): Promise<TCoordinates[]> {
        const treasuremap = new TreasureMap();
        const coordinates = await treasuremap.getTreasureCoordinates()
        // console.log("coordinates", coordinates);
        const pins = this.currentCoordinates.split(",");
        const treasureCoordinates = coordinates as TCoordinates[];
        const geoLibCoordinates = treasureCoordinates.map((treasureCoordinate): GeolibInputCoordinates => { 
            return {
                latitude: treasureCoordinate.latitude, 
                longitude: treasureCoordinate.longtitude
            } 
        });
        const coordinatesWithinRange: GeolibInputCoordinates[] = [];
        geoLibCoordinates.forEach(geoLibCoordinate => {
            const distance = getDistance({ latitude: pins[0], longitude: pins[1] }, geoLibCoordinate)
            if (distance <= (range * 1000)) { // 1000 meters = 1 kilometer
                coordinatesWithinRange.push(geoLibCoordinate);
            }
        });

        // console.log("coordinatesWithinRange", coordinatesWithinRange);
        return intersectionBy(treasureCoordinates, coordinatesWithinRange, 'latitude');
    }
    private currentCoordinates: string;

    constructor(coordinates: string) {
        super();
        this.currentCoordinates = coordinates;
    }
}