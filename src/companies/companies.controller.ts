import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './create-company.dto';
import { Company } from './company.entity';

@Controller('companies')
export class CompaniesController {
  constructor(private readonly service: CompaniesService) {}

  @Post()
  create(@Body() dto: CreateCompanyDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Get('/count-by-company/:companyId')
  getDriverCountByCompany(@Param('companyId') companyId: string) {
    console.log('ID de la empresa usada en la consulta:', companyId);
    console.log('cantidad de conductores:', this.service.countDriversByCompany(companyId));
    return this.service.countDriversByCompany(companyId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: Company) {
    return this.service.update(+id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.service.delete(+id);
  }
}
