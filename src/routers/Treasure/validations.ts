import { Request, Response, NextFunction, RequestHandler } from "express";
import Joi from "joi";

const regex = new RegExp(/^((\-?|\+?)?\d+(\.\d+)?),\s*((\-?|\+?)?\d+(\.\d+)?)$/);
const findTreasureBoxesSchema = Joi.object({
    location: Joi.string().pattern(regex).required(),
    distance: Joi.string().valid(1, 10)
})

export const validate: RequestHandler = 
    (req: Request, res: Response, next: NextFunction) => {
        const location: string = req.params.location;
        const range: number = parseInt(req.params.range);

        const validationResult = findTreasureBoxesSchema.validate({
            location,
            distance: range
        });

        console.log('validationResult', validationResult)
        if (validationResult.error) {
            return res.status(400)
                .json({
                    message: validationResult.error.details[0].message
                })
        }

        next();
    };  