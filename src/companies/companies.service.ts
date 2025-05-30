import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from './company.entity';
import { CreateCompanyDto } from './create-company.dto';
import { CompanyMapper } from './companies.mappers';
import * as bcrypt from "bcrypt";

@Injectable()
export class CompaniesService {
  constructor(@InjectRepository(Company) private repo: Repository<Company>) {}

  async create(data: CreateCompanyDto) {
    const company = CompanyMapper.toEntity(data);
    const salt = await bcrypt.genSalt();
    company.password = await bcrypt.hash(data.password, salt);
    return this.repo.save(company);
  }

  findAll() {
    return this.repo.find();
  }

  findbyByEmail(email: string) {
    return this.repo.findOneBy({ email })
  }

  findOne(id: string) {
    return this.repo.findOneBy({ id });
  }

  update(id: number, data: Partial<Company>) {
    return this.repo.update(id, data);
  }

  delete(id: number) {
    return this.repo.delete(id);
  }
}
