export interface CreateCompanyDto {
    name: string;
    ruc: string;
    address: string;
    phone: string;
    email: string;
    password: string;
}

export interface Company {
    name: string;
    ruc: string;
    address: string;
    phone: string;
}
