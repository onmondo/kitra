import { getDistance } from "geolib";
import { TreasureMap } from "./TreasureMap";
import { TCoordinates } from "./types";
import { GeolibInputCoordinates } from "geolib/es/types";
import { intersectionWith, isEqual } from "lodash";
import { Hunter } from "./Hunter";
import IFindingTreasure from "./IFindingTreasure";
import { Query } from "mysql2";

export default class BountyHunter extends Hunter {
    protected keenFindTreasure(findParam: IFindingTreasure): Query {
        const treasuremap = new TreasureMap();
        if(findParam.reportParam?.page) treasuremap.setPage(findParam.reportParam?.page)
        if(findParam.reportParam?.limit) treasuremap.setLimit(findParam.reportParam?.limit)
        
        return treasuremap.v3(treasuremap).getTreasureCoordinatesWithPrize()
    }
    
    protected async findTreasure(findParam: IFindingTreasure): Promise<TCoordinates[]> {
        const treasuremap = new TreasureMap();
        treasuremap.setPrize(this.prize);
        if(findParam.reportParam?.page) treasuremap.setPage(findParam.reportParam?.page)
        if(findParam.reportParam?.limit) treasuremap.setLimit(findParam.reportParam?.limit)
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
            if (distance <= (findParam.range * 1000)) { // 1000 meters = 1 kilometer
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