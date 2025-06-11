import apiClient from "@/api/axios";
import { CreateUserDto, GetAllUsersDto, User } from "@/dto/user.dto";

export const createUser = async (data: CreateUserDto): Promise<User> => {
    const response = await apiClient.post<User>('/users', data, { withCredentials: true });
    return response.data;
}

export const getUsers = async (): Promise<GetAllUsersDto[]> => {
    const response = await apiClient.get<GetAllUsersDto[]>('/users');
    return response.data;
};

export const getUserById = async (id: string): Promise<User> => {
    const response = await apiClient.get<User>(`/users/${id}`);
    return response.data;
};

export const getDriverCountByCompany = async (companyId: string): Promise<number> => {
    const response = await apiClient.get<number>(`/users/count-by-company/${companyId}`);
    return response.data;
};

export const getDriversByCompany = async (companyId: string): Promise<User[]> => {
    const response = await apiClient.get<User[]>(`/users/by-company/${companyId}`);
    return response.data;
};

export const updateUser = async (id: string, data: Partial<User>): Promise<User> => {
    const response = await apiClient.patch<User>(`/users/${id}`, data);
    return response.data;
};

export const deleteUser = async (id: string): Promise<void> => {
    await apiClient.delete(`/users/${id}`);
};