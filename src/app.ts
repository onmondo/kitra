require('dotenv').config();
import express, { NextFunction, Request, Response } from "express";
import treasureRoute from "./routers/Treasure"
import userRoute from "./routers/User"
import cors from 'cors';
// import { envKeys } from './util/config';

const app = express()
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

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}`))
