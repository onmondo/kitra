import { Request, Response, NextFunction, RequestHandler } from "express";
import { find, isEmpty } from "lodash";
import TreasureHunter from "../../services/Treasure/TreasureHunter";
import BountyHunter from "../../services/Treasure/BountyHunter";
import { Hunter } from "../../services/Treasure/Hunter";
import { TreasureMap } from "../../services/Treasure/TreasureMap";
import IFindingTreasure from "../../services/Treasure/IFindingTreasure";

export const findTreasureBoxes: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const coordinates: string = req.params.coordinates;
        const range: number = parseInt(req.params.range);
        const prizeQuery = req.query.prize;
        const pageQuery = req.query?.page;
        const limitQuery = req.query?.limit;
        const prize = prizeQuery as string;
        const pageStr = pageQuery as string;
        const limitStr = limitQuery as string;

        const treasureHunder: Hunter = (prize)
            ? new BountyHunter(coordinates, parseInt(prize))
            : new TreasureHunter(coordinates);
        
        const findTreasure: IFindingTreasure = { range }
        if(pageStr && limitStr) {
            findTreasure.reportParam = { page: parseInt(pageStr), limit: parseInt(limitStr) }
        }

        const treasureBoxes = await treasureHunder.hunt(findTreasure);
        
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

export const findTreasureBoxeById: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id: string = req.params.id;

        const treasureMap = new TreasureMap();
        const treasureBoxes = await treasureMap.getTreasureBoxesById(id);
        
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