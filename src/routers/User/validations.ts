import { Request, Response, NextFunction, RequestHandler } from "express";
import Joi from "joi";

const findUserSchema = Joi.object({
    id: Joi.number().integer().required(),
})

export const validate: RequestHandler = 
    (req: Request, res: Response, next: NextFunction) => {
        
        const id: number = parseInt(req.params.id);

        const validationResult = findUserSchema.validate({ id });

        if (validationResult.error) {
            return res.status(400)
                .json({
                    message: validationResult.error.details[0].message
                })
        }

        next();
    };  