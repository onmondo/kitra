import { TreasureMap } from "./TreasureMap";
import { TCoordinates } from "./types";
import { Hunter } from "./Hunter";
import IFindingTreasure from "./IFindingTreasure";
import { Query } from "mysql2";

export default class TreasureHunter extends Hunter {
    protected async findTreasure(findParam: IFindingTreasure): Promise<TCoordinates[]> {
        const treasuremap = new TreasureMap();
        if(findParam.reportParam?.page) treasuremap.setPage(findParam.reportParam?.page)
        if(findParam.reportParam?.limit) treasuremap.setLimit(findParam.reportParam?.limit)
        const pins = this.currentCoordinates.split(",");
        const coordinates = treasuremap.v2(treasuremap).getTreasureCoordinates(pins, findParam.range)

        return coordinates;
    }

    protected keenFindTreasure(findParam: IFindingTreasure): Query {
        const treasuremap = new TreasureMap();
        if(findParam.reportParam?.page) treasuremap.setPage(findParam.reportParam?.page)
        if(findParam.reportParam?.limit) treasuremap.setLimit(findParam.reportParam?.limit)
        return treasuremap.v3(treasuremap).getTreasureCoordinates()
    }

    private currentCoordinates: string;

    constructor(coordinates: string) {
        super();
        this.currentCoordinates = coordinates;
    }
}