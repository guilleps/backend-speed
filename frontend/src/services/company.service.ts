import apiClient from "@/api/axios"
import { Company, CreateCompanyDto } from "@/dto/company.dto";

export const createCompany = async (data: CreateCompanyDto): Promise<Company> => {
    const response = await apiClient.post<Company>('/companies', data);
    return response.data;
}

export const getCompanies = async (): Promise<Company[]> => {
    const response = await apiClient.get<Company[]>('/companies');
    return response.data;
};

export const getCompanyById = async (id: string): Promise<Company> => {
    const response = await apiClient.get<Company>(`/companies/${id}`);
    return response.data;
};

export const updateCompany = async (id: string, data: Partial<Company>): Promise<Company> => {
    const response = await apiClient.patch<Company>(`/companies/${id}`, data);
    return response.data;
};

export const deleteCompany = async (id: string): Promise<void> => {
    await apiClient.delete(`/companies/${id}`);
};