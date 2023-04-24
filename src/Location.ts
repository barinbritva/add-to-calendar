export type LocationName = string;
export type LocationCoordinates = {
	latitude: number;
	longitude: number;
};

export type Location = LocationName | [LocationName, LocationCoordinates?];
