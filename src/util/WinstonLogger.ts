import e from "express";
import ewinston from "express-winston";
import winston from "winston";

export default class WinstonLogger {
    private static instance: WinstonLogger;

    private logger: e.Handler

    public getLogger() {
        return this.logger;
    }

    private constructor() {
        const format = winston.format
        const logger = ewinston.logger({
            // level: "info", // could be info | warn | debug etc...
            // level: "info",
            format: format.combine(
                format.timestamp(), 
                format.json(),
                // format.metadata(),
                format.prettyPrint()
            ),
            transports: [
                new winston.transports.Console(),
                new winston.transports.File({ filename: "app-info.log", level: "info" })
            ]
        })
        this.logger = logger
    }

    public static getInstance(): WinstonLogger {
        if(!WinstonLogger.instance) {
            console.log("Creating new winston logger...");
            WinstonLogger.instance = new WinstonLogger()
        }

        return WinstonLogger.instance;
    }
}