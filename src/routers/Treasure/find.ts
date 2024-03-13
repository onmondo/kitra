import { Request, Response, NextFunction, RequestHandler } from "express";
import { isEmpty } from "lodash";

export const findTreasureBoxes: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const treasureBoxes: string[] = []
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
        console.log(error);
    }
}