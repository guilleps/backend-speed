import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Report } from './report.entity';
import { Repository } from 'typeorm';
import { AuthenticatedUser } from 'src/shared/interfaces/authenticated-user.interface';
import { CreateReportDto } from './create-report.dto';

@Injectable()
export class ReportsService {
  constructor(@InjectRepository(Report) private repo: Repository<Report>) { }

  async create(dto: CreateReportDto, user: AuthenticatedUser) {
    const report = this.repo.create({
      ...dto,
      createdBy: { id: user.userId },
      company: { id: user.companyId },
    });
    // console.log('Nuevo reporte guardado con filtros:', report);
    return await this.repo.save(report);
  }

  async findReportsByUserOrCompany(user: AuthenticatedUser) {
    if (user.role === 'company') {
      return this.repo.find({ where: { company: { id: user.companyId } }, order: { createdAt: 'DESC' } });
    } else {
      return this.repo.find({ where: { createdBy: { id: user.userId } }, order: { createdAt: 'DESC' } });
    }
  }
  
  findAll() {
    return this.repo.find();
  }

  findOne(id: string) {
    return this.repo.findOneBy({ id });
  }
}
