import { Request, Response, NextFunction, RequestHandler } from "express";
import Joi from "joi";
import { TTreasureValidation } from "../../services/Treasure/types";
import HuntValidation from "../../services/Treasure/HuntValidation";
import { isEmpty } from "lodash";

const regex = new RegExp(/^((\-?|\+?)?\d+(\.\d+)?),\s*((\-?|\+?)?\d+(\.\d+)?)$/);
const findTreasureBoxesSchema = Joi.object({
    coordinates: Joi.string().pattern(regex).required(),
    distance: Joi.number().valid(1, 10).required(),
    // prize: Joi.number().integer().min(10).max(30).optional(),
    prize: Joi.string().pattern(new RegExp(/\b(?:1[0-9]|2[0-9]|30)\b/)).length(2).optional()
})

export const validate: RequestHandler = 
    (req: Request, res: Response, next: NextFunction) => {
        const coordinates: string = req.params.coordinates;
        const range: number = parseInt(req.params.range);
        const prizeQuery = req.query?.prize;

        const huntValidation = new HuntValidation.HuntValidationBuilder();
        huntValidation.setCoordinates(coordinates);
        huntValidation.setDistance(range);
        if (!isEmpty(prizeQuery)) {
            const prize = prizeQuery as string
            huntValidation.setPrize(prize)
        }

        console.log(huntValidation)
        const validationRequest = huntValidation.build();
        const validationResult = findTreasureBoxesSchema.validate(validationRequest.getTreasureValidation());

        if (validationResult.error) {
            return res.status(400)
                .json({
                    message: validationResult.error.details[0].message
                })
        }

        next();
    };  