import e from "express";
import ewinston from "express-winston";
import winston from "winston";

export default class WinstonErrorLogger {
    private static instance: WinstonErrorLogger;

    private logger: e.ErrorRequestHandler<any>

    public getLogger() {
        return this.logger;
    }

    private constructor() {
        const format = winston.format
        const logger = ewinston.errorLogger({
            // level: "info", // could be info | warn | debug etc...
            // level: "warn",
            format: format.combine(
                format.timestamp(), 
                format.json(),
                format.metadata(),
                format.prettyPrint()
            ),
            transports: [
                new winston.transports.Console(),
                new winston.transports.File({ filename: "app-error.log", level: "error" }),
                new winston.transports.File({ filename: "app-warn.log", level: "warn" }),
            ]
        })
        this.logger = logger
    }

    public static getInstance(): WinstonErrorLogger {
        if(!WinstonErrorLogger.instance) {
            console.log("Creating new winston error logger...");
            WinstonErrorLogger.instance = new WinstonErrorLogger()
        }

        return WinstonErrorLogger.instance;
    }
}