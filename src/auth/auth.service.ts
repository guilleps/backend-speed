import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CompaniesService } from 'src/companies/companies.service';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly companiesService: CompaniesService,
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) { }

  async login({ email, password }: LoginDto) {
    const company = await this.companiesService.findByEmail(email);

    console.log('company', company);
    
    const user = await this.usersService.findByEmail(email);

    console.log('user', user);

    const entity = user || company;
    if (!entity) throw new UnauthorizedException('Entity not founded');

    const passwordMatches = await bcrypt.compare(password, entity.password);
    if (!passwordMatches) throw new UnauthorizedException('Wrong password');

    const role = user ? 'conductor' : 'company';
    const companyId = user?.company?.id ?? (company ? company.id : undefined);

    if (!companyId) throw new UnauthorizedException('Conductor sin empresa asignada');

    console.log('user info', user);
    console.log('company info', company);
    

    const payload = {
      sub: entity.id,
      email: entity.email,
      role,
      companyId
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: payload
    };
  }
}