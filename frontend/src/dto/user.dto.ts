export interface CreateUserDto {
    name: string;
    email: string;
    password: string;
    companyId?: string;
    role: string;
}

export interface User {
    id: string;
    name: string;
    email: string;
    password?: string;
    role: string;
    status: string;
}

export interface GetAllUsersDto {
    id: string;
    name: string;
    email: string;
    role: string;
    status: string
}

