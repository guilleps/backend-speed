import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from "bcrypt";
import { CompaniesService } from 'src/companies/companies.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly companiesService: CompaniesService,
        private readonly jwtService: JwtService,
        private readonly usersService: UsersService
    ) { }

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

    async validateUser(email: string, password: string) {
        const user = await this.usersService.findByEmail(email);
        if (!user) throw new UnauthorizedException('User not found');

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw new UnauthorizedException('Invalid credentials');

        return user;
    }

    async loginUser(email: string, password: string) {
        const user = await this.validateUser(email, password);

        const payload = {
            sub: user.id,
            email: user.email,
            companyId: user.companyId,
            role: 'CONDUCTOR',
        };

        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}
