import { Query } from "mysql2";
import IFindingTreasure from "./IFindingTreasure";
import { TCoordinates } from "./types";

export abstract class Hunter {
    public async hunt(findParam: IFindingTreasure): Promise<TCoordinates[]> {
        const treasures = await this.findTreasure(findParam);
        return treasures;
    }

    public wildhunt(findParam: IFindingTreasure): Query {
        const treasures = this.keenFindTreasure(findParam);
        return treasures;
    }

    protected abstract findTreasure(findParam: IFindingTreasure): Promise<TCoordinates[]>

    protected abstract keenFindTreasure(findParam: IFindingTreasure): Query
}