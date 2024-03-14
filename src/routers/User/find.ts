import { RequestHandler, Request, Response, NextFunction } from "express";
import { isEmpty } from "lodash";
import Reports from "../../services/User/Reports";

export const findAllUsers: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await Reports.getAllUsers();
        
        if (isEmpty(users)) {
            res.json({
                message: "Sorry no user/s found",
                users
            });
        } else {
            res.json({
                message: "Successfully retrieved users",
                users
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

export const findUserById: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await Reports.getUserById(req.params.id);
        
        if (isEmpty(users)) {
            res.json({
                message: "Sorry no user found",
                users
            });
        } else {
            res.json({
                message: "Successfully retrieved user",
                users
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