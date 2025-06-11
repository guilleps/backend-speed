import apiClient from "@/api/axios"
import { City, CreateCityDto } from "@/dto/city.dto";

export const createCity = async (data: CreateCityDto): Promise<City> => {
    const response = await apiClient.post<City>('/cities', data);
    return response.data;
};

export const getCitiesByCompany = async (): Promise<City[]> => {
    const response = await apiClient.get<City[]>("/cities/available");
    return response.data;
};

export const getCities = async (): Promise<City[]> => {
    const response = await apiClient.get<City[]>('/cities');
    return response.data;
};

export const getCityCountByCompany = async (): Promise<number> => {
    const response = await apiClient.get<number>('/cities/count/by-company');
    return response.data;
};

export const getCityById = async (id: string): Promise<City> => {
    const response = await apiClient.get<City>(`/cities/${id}`);
    return response.data;
};

export const updateCity = async (id: string, data: Partial<City>): Promise<City> => {
    const response = await apiClient.patch<City>(`/cities/${id}`, data);
    return response.data;
};

export const deleteCity = async (id: string): Promise<void> => {
    await apiClient.delete(`/cities/${id}`);
};