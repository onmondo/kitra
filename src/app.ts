require('dotenv').config();
import express, { NextFunction, Request, Response } from "express";
import treasureRoute from "./routers/Treasure"
import userRoute from "./routers/User"
import cors from 'cors';
import WinstonLogger from "./util/WinstonLogger";
import WinstonErrorLogger from "./util/WinstonErrorLogger";

export const app = express()
const winstonLogger = WinstonLogger.getInstance()
const logger = winstonLogger.getLogger();
const winstErrorLogger = WinstonErrorLogger.getInstance()
const errorLogger = winstErrorLogger.getLogger();

app.use(logger)
app.use(errorLogger)
app.use(express.json());

app.use(cors());

app.set("query parser", false);

app.get('/api/v1/health', (req: Request, res: Response) => {
    return res.json({
        message: "Up and running..."
    })
});

app.use('/api/v1/treasure', treasureRoute);
app.use('/api/v1/user', userRoute);

app.all('*', (req: Request, res: Response, next: NextFunction) => {
    const err = new Error(`Cannot find ${req.originalUrl} on this server!`);
    next(err);
    res.sendStatus(404)
    res.render('error', { error: err })
});

