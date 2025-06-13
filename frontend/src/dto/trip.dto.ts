import { User } from "./user.dto";

export interface Trip {
    id: string;
    startDate: string;
    endDate: string;
    origin: Location;
    destination: Location;
    companyId: string;
    user?: User;
    details?: Detail[];
    status?: "IN_PROGRESS" | "FINISHED";
}

export interface Detail {
    id: string;
    message: string;
    responded: boolean;
    triggerSecond: number;
    tripId: string;
}

interface BaseTripDto {
    startDate: string;
    origin: string;
    destination: string;
    status: string;
}

export interface CreateTripDto extends BaseTripDto {
    endDate?: string;
}

export interface GetAllTripsDto extends BaseTripDto {
    endDate: string;
}

export interface Location {
    id: string;
    name: string;
    address: string;
    companyId: string;
}