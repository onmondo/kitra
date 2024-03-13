import { Request, Response, NextFunction, RequestHandler } from "express";
import Joi from "joi";
import { TTreasureValidation } from "../../services/Treasure/types";

const regex = new RegExp(/^((\-?|\+?)?\d+(\.\d+)?),\s*((\-?|\+?)?\d+(\.\d+)?)$/);
const findTreasureBoxesSchema = Joi.object({
    coordinates: Joi.string().pattern(regex).required(),
    distance: Joi.number().valid(1, 10).required(),
    // prize: Joi.number().integer().min(10).max(30).optional(),
})

export const validate: RequestHandler = 
    (req: Request, res: Response, next: NextFunction) => {
        const coordinates: string = req.params.coordinates;
        const range: number = parseInt(req.params.range);
        const prizeQuery = req.query.prize;
        const prize = prizeQuery as string;


        // Builder pattern apply here
        const forValidation: TTreasureValidation = {
            coordinates,
            distance: range,
            // prize: parseInt(prize)
        }
        const validationResult = findTreasureBoxesSchema.validate(forValidation);

        console.log('validationResult', validationResult)
        if (validationResult.error) {
            return res.status(400)
                .json({
                    message: validationResult.error.details[0].message
                })
        }

        next();
    };  