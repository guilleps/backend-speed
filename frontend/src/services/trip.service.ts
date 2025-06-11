import apiClient from "@/api/axios";
import { ReportFilters } from "@/dto/report.dto";
import { CreateTripDto, GetAllTripsDto, Trip } from "@/dto/trip.dto";

export const createTrip = async (data: CreateTripDto): Promise<Trip> => {
    const response = await apiClient.post<Trip>('/trips', data, { withCredentials: true });
    return response.data;
}

export const getTrips = async (): Promise<GetAllTripsDto[]> => {
    const response = await apiClient.get<GetAllTripsDto[]>('/trips');
    return response.data;
};

export const getTripsByUser = async (): Promise<Trip[]> => {
    const response = await apiClient.get<Trip[]>('/trips/by-user', {
        withCredentials: true,
    });
    return response.data;
};

export const getTripsByCompany = async (): Promise<Trip[]> => {
    const response = await apiClient.get<Trip[]>('/trips/by-company', {
        withCredentials: true,
    });
    return response.data;
};

export const getTripCountByCompanyLastWeek = async (): Promise<number> => {
    const response = await apiClient.get<number>('/trips/count/company/last-week');
    return response.data;
};

export const getCountByUser = async (): Promise<number> => {
    const response = await apiClient.get<number>('/trips/count/by-user');
    return response.data;
};

export const getDestinationsByCompany = async (id: string): Promise<string[]> => {
    const response = await apiClient.get<string[]>(`/trips/destinations/by-company/${id}`);
    // console.log(response);
    return response.data;
}

export const getDestinationsByUser = async (): Promise<string[]> => {
    const response = await apiClient.get<string[]>(`/trips/destinations/by-user`, {
        withCredentials: true
    });
    return response.data;
};

export const searchReports = async (filters: ReportFilters): Promise<Trip[]> => {
    const params = new URLSearchParams();

    if (filters.dateFrom) params.append('dateFrom', filters.dateFrom);
    if (filters.dateTo) params.append('dateTo', filters.dateTo);
    if (filters.driver) params.append('driver', filters.driver);
    if (filters.destination) params.append('destination', filters.destination);
    if (filters.status) params.append('status', filters.status);

    const response = await apiClient.get<Trip[]>('/trips/search', {
        params,
        withCredentials: true
    });

    return response.data;
};

export const getTripById = async (id: string): Promise<Trip> => {
    const response = await apiClient.get<Trip>(`/trips/${id}`);
    return response.data;
};

export const updateTrip = async (id: string, data: Partial<Trip>): Promise<Trip> => {
    const response = await apiClient.patch<Trip>(`/trips/${id}`, data);
    return response.data;
};

export const deleteTrip = async (id: string): Promise<void> => {
    await apiClient.delete(`/trips/${id}`);
};

export const getDynamicTrips = async (): Promise<Trip[]> => {
    const response = await apiClient.get<Trip[]>('/trips/dynamic', {
        withCredentials: true
    });
    return response.data;
};  
