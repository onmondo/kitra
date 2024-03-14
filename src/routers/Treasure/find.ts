import { Request, Response, NextFunction, RequestHandler } from "express";
import { isEmpty } from "lodash";
import TreasureHunter from "../../services/Treasure/TreasureHunter";
import BountyHunter from "../../services/Treasure/BountyHunter";
import { Hunter } from "../../services/Treasure/Hunter";

export const findTreasureBoxes: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const coordinates: string = req.params.coordinates;
        const range: number = parseInt(req.params.range);
        const prizeQuery = req.query.prize;
        const prize = prizeQuery as string;

        const treasureHunder: Hunter = (prize)
            ? new BountyHunter(coordinates, parseInt(prize))
            : new TreasureHunter(coordinates);
        const treasureBoxes = await treasureHunder.hunt(range);
        
        if (isEmpty(treasureBoxes)) {
            res.json({
                message: "Sorry no treasure box available...",
                treasureBoxes
            });
        } else {
            res.json({
                message: "Treasure boxes found!",
                treasureBoxes
            });
        }
    } catch(error: any) {
        const errorDetails = error as Error;
        res.status(500).json({
            message: 'Internal Server Error',
            error: errorDetails.message
        });
    }
}