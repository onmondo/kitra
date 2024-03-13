export type TCoordinates = {
    id: number;
    latitude: string;
    longtitude: string;
    name: string;
};

export type TTreasureValidation = {
    coordinates: string;
    distance: number;
    prize?: number;
}
