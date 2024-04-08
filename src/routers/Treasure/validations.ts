import { Request, Response, NextFunction, RequestHandler } from "express";
import Joi from "joi";
// import { TTreasureValidation } from "../../services/Treasure/types";
import HuntValidation from "../../services/Treasure/HuntValidation";
import { isEmpty } from "lodash";

const findTreasureBoxesSchema = Joi.object({
    coordinates: Joi.string().pattern(new RegExp(/^((\-?|\+?)?\d+(\.\d+)?),\s*((\-?|\+?)?\d+(\.\d+)?)$/)).required(),
    distance: Joi.number().valid(1, 10).required(),
    // prize: Joi.number().integer().min(10).max(30).optional(),
    prize: Joi.string().pattern(new RegExp(/\b(?:1[0-9]|2[0-9]|30)\b/)).length(2).optional()
})

const findTreasureBoxSchema = Joi.object({
    id: Joi.number().integer().required(),
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

export const validateId: RequestHandler = 
    (req: Request, res: Response, next: NextFunction) => {
        const id: string = req.params.id;

        const huntValidation = new HuntValidation.HuntValidationBuilder();
        huntValidation.setId(id);

        const validationRequest = huntValidation.build();
    
        const validationResult = findTreasureBoxSchema.validate({ id: validationRequest.getTreasureValidation().id});

        if (validationResult.error) {
            return res.status(400)
                .json({
                    message: validationResult.error.details[0].message
                })
        }

        next();
    };        