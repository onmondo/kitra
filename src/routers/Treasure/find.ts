import { Request, Response, NextFunction, RequestHandler } from "express";
import { isEmpty } from "lodash";
import TreasureHunter from "../../services/Treasure/TreasureHunter";
import BountyHunter from "../../services/Treasure/BountyHunter";
import { Hunter } from "../../services/Treasure/Hunter";
import { TreasureMap } from "../../services/Treasure/TreasureMap";
import IFindingTreasure from "../../services/Treasure/IFindingTreasure";
import { TCoordinates } from "../../services/Treasure/types";
import HunterFacade from "../../services/Treasure/HunterFacade";

export const v1 = {
    async findTreasureBoxes(req: Request, res: Response, next: NextFunction){
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
    },
    
    async findTreasureBoxeById(req: Request, res: Response, next: NextFunction) {
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
}

export const v2 = {
    ...v1,
    async findTreasureBoxes(req: Request, res: Response, next: NextFunction){
        try {
            const coordinates: string = req.params.coordinates;
            const range: number = parseInt(req.params.range);
            const prizeQuery = req.query.prize;
            const pageQuery = req.query?.page;
            const limitQuery = req.query?.limit;
            const prize = prizeQuery as string;
            const pageStr = pageQuery as string;
            const limitStr = limitQuery as string;
            const pins = coordinates.split(",");
            const coordinatesWithinRange: TCoordinates[] = []

            const treasureHunder: Hunter = (prize)
                ? new BountyHunter(coordinates, parseInt(prize))
                : new TreasureHunter(coordinates);
            
            const findTreasure: IFindingTreasure = { range }
            if(pageStr && limitStr) {
                findTreasure.reportParam = { page: parseInt(pageStr), limit: parseInt(limitStr) }
            }
    
            const cursor = treasureHunder.wildhunt(findTreasure);
            const facade = new HunterFacade(pins, range, coordinatesWithinRange);

            console.log("sql", cursor.sql)

            cursor.on("result", (row) => {
                facade.computeRange(row)
            });

            cursor.on("error", (err) => {
                throw new Error(`Failed to fetch treasure boxes: ${err}`)
            });

            cursor.on("end", () => {
                res.json({ 
                    message: (isEmpty(coordinatesWithinRange)) ? "Sorry no treasure box available..." : "Treasure boxes found!",
                    treasureBoxes: coordinatesWithinRange
                })
            })
            
        } catch(error: any) {
            const errorDetails = error as Error;
            res.status(500).json({
                message: 'Internal Server Error',
                error: errorDetails.message
            });
        }
    }
}
