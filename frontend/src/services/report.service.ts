import apiClient from "@/api/axios";
import { CreateReportDto, Report } from "@/dto/report.dto";

export const createReport = async (data: CreateReportDto): Promise<Report> => {
    const response = await apiClient.post<Report>('/reports', data);
    return response.data;
};

export const getReportsByRole = async (): Promise<Report[]> => {
    const response = await apiClient.get<Report[]>('/reports');
    return response.data;
};
