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
    conduct?: string;
    inputConduct?: InputConduct;
    status?: "IN_PROGRESS" | "FINISHED";
}

export interface InputConduct {
    acceleration_score: number;
    braking_score: number;
    turning_score: number;
    weaving_score: number;
    drifting_score: number;
    speeding_score: number;
    follow_score: number;
    road_type: number;
    temp_F: number;
    humidity_pct: number;
    wind_speed_mph: number;
    wind_gust_mph: number;
    condition: number;
    day_night: number;
    speed_mph: number;
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