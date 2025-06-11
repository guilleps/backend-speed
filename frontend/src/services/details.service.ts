import apiClient from "@/api/axios"
import { AlertRecordDto, Detail } from "@/dto/detail.dto";

export const createDetail = async (id: string, alertas: AlertRecordDto[]): Promise<any> => {
    const response = await apiClient.post<any>(`/details/register/${id}`, alertas);
    return response.data;
};

export const getDetails = async (): Promise<Detail[]> => {
    const response = await apiClient.get<Detail[]>('/details');
    return response.data;
};

export const getDetailByTripId = async (): Promise<Detail[]> => {
    const response = await apiClient.get<Detail[]>('/details');
    return response.data;
};

export const getDetailById = async (id: string): Promise<Detail> => {
    const response = await apiClient.get<Detail>(`/details/${id}`);
    return response.data;
};

export const updateDetail = async (id: string, data: Partial<Detail>): Promise<Detail> => {
    const response = await apiClient.patch<Detail>(`/details/${id}`, data);
    return response.data;
};

export const deleteDetail = async (id: string): Promise<void> => {
    await apiClient.delete(`/details/${id}`);
};