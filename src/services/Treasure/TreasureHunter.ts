import { getDistance } from "geolib";
import { TreasureMap } from "./TreasureMap";
import { TCoordinates } from "./types";
import { GeolibInputCoordinates } from "geolib/es/types";
import { intersectionWith, isEqual } from "lodash";
import { Hunter } from "./Hunter";
import IFindingTreasure from "./IFindingTreasure";

export default class TreasureHunter extends Hunter {
    protected async findTreasure(findParam: IFindingTreasure): Promise<TCoordinates[]> {
        const treasuremap = new TreasureMap();
        if(findParam.reportParam?.page) treasuremap.setPage(findParam.reportParam?.page)
        if(findParam.reportParam?.limit) treasuremap.setLimit(findParam.reportParam?.limit)
        const coordinates = await treasuremap.getTreasureCoordinates()
        const pins = this.currentCoordinates.split(",");
        const treasureCoordinates = coordinates as TCoordinates[];
        const coordinatesWithinRange: TCoordinates[] = [];
        treasureCoordinates.forEach(treasureCoordinate => {
            const geoLibCoordinate: GeolibInputCoordinates = {
                latitude: treasureCoordinate.latitude, 
                longitude: treasureCoordinate.longtitude
            } 
            const distance = getDistance({ latitude: pins[0], longitude: pins[1] }, geoLibCoordinate)
            if (distance <= (findParam.range * 1000)) { // 1000 meters = 1 kilometer
                coordinatesWithinRange.push(treasureCoordinate);
            }
        });

        return intersectionWith(treasureCoordinates, coordinatesWithinRange, isEqual);
    }
    private currentCoordinates: string;

    constructor(coordinates: string) {
        super();
        this.currentCoordinates = coordinates;
    }
}