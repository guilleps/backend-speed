import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from "bcrypt";
import { CompaniesService } from 'src/companies/companies.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly companiesService: CompaniesService,
        private readonly jwtService: JwtService
    ) {}

    async validateCompany(email: string, password: string) {
        const company = await this.companiesService.findbyByEmail(email);
        if (!company) throw new UnauthorizedException('Company not founded');

        const isMatch = await bcrypt.compare(password, company.password);
        if (!isMatch) throw new UnauthorizedException('Invalid credentials');

        return { id: company.id, name: company.name, email: company.email };
    }

    async login(email: string, password: string) {
        const company = await this.validateCompany(email, password);

        const payload = { sub: company.id, email: company.email };
        const access_token = await this.jwtService.signAsync(payload);
        return { access_token };
    }
}
