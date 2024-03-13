import { TCoordinates } from "./types";

export abstract class Hunter {
    public async hunt(range: number): Promise<TCoordinates[]> {
        const treasures = await this.findTreasure(range);
        return treasures;
    }

    protected abstract findTreasure(range: number): Promise<TCoordinates[]>
}