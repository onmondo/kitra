import { getDistance } from "geolib";
import { TreasureMap } from "./TreasureMap";
import { TCoordinates } from "./types";
import { GeolibInputCoordinates } from "geolib/es/types";
import { intersectionWith, isEqual } from "lodash";
import { Hunter } from "./Hunter";

export default class BountyHunter extends Hunter {
    protected async findTreasure(range: number): Promise<TCoordinates[]> {
        const treasuremap = new TreasureMap();
        treasuremap.setPrize(this.prize);
        const coordinates = await treasuremap.getTreasureCoordinatesWithPrize()
        const pins = this.currentCoordinates.split(",");
        const treasureCoordinates = coordinates as TCoordinates[];
        const coordinatesWithinRange: TCoordinates[] = [];
        treasureCoordinates.forEach(treasureCoordinate => {
            const geoLibCoordinate: GeolibInputCoordinates = {
                latitude: treasureCoordinate.latitude, 
                longitude: treasureCoordinate.longtitude
            } 
            const distance = getDistance({ latitude: pins[0], longitude: pins[1] }, geoLibCoordinate)
            if (distance <= (range * 1000)) { // 1000 meters = 1 kilometer
                coordinatesWithinRange.push(treasureCoordinate);
            }
        });

        return intersectionWith(treasureCoordinates, coordinatesWithinRange, isEqual);
    }

    private currentCoordinates: string;
    private prize: number;

    constructor(coordinates: string, prize: number) {
        super();
        this.currentCoordinates = coordinates;
        this.prize = prize;
    }
}