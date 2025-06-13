import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from './company.entity';
import { CreateCompanyDto } from './create-company.dto';
import { CompanyMapper } from './companies.mappers';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CompaniesService {
  constructor(@InjectRepository(Company) private repo: Repository<Company>,) {}

  async create(data: CreateCompanyDto) {
    const company = CompanyMapper.toEntity(data);
    const salt = await bcrypt.genSalt();
    company.password = await bcrypt.hash(data.password, salt);
    return this.repo.save(company);
  }

  async getName(companyId: string): Promise<string | null> {
    const user = await this.repo.findOne({
      where: { id: companyId },
      select: ['name'],
    });
  
    return user?.name ?? null;
  }

  findAll() {
    return this.repo.find();
  }

  findByEmail(email: string) {
    return this.repo.findOneBy({ email });
  }

  async findOne(id: string) {
    const companyFounded = await this.repo.findOneBy({ id });

    if (!companyFounded) return null;

    return {
      name: companyFounded.name,
      ruc: companyFounded.ruc,
      address: companyFounded.address,
      phone: companyFounded.phone,
    };
  }

  update(id: number, data: Partial<Company>) {
    return this.repo.update(id, data);
  }

  delete(id: number) {
    return this.repo.delete(id);
  }
}
