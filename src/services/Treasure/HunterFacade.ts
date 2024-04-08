import { GeolibInputCoordinates } from "geolib/es/types";
import { TCoordinates } from "./types";
import { getDistance } from "geolib";
import { OkPacket, RowDataPacket } from "mysql2";

export default class HunterFacade {
    pins: string[];
    range: number;
    collection: TCoordinates[];

    constructor(pins: string[], range: number, collection: TCoordinates[]) {
        this.pins = pins
        this.range = range
        this.collection = collection
    }

    public computeRange(row: RowDataPacket | OkPacket): void {
        const coordinate = row as TCoordinates
        const geoLibCoordinate: GeolibInputCoordinates = {
            latitude: coordinate.latitude, 
            longitude: coordinate.longtitude
        } 
        const distance = getDistance({ latitude: this.pins[0], longitude: this.pins[1] }, geoLibCoordinate)
        if (distance <= (this.range * 1000)) { // 1000 meters = 1 kilometer
            this.collection.push(coordinate);
        }   
    }

    getCollection() {
        return this.collection;
    }
}