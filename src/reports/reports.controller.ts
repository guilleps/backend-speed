import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ReportsService } from './reports.service';
import { CreateReportDto } from './create-report.dto';
import { Report } from './report.entity';

@Controller('reports')
export class ReportsController {
  constructor(private readonly service: ReportsService) {}

  @Post()
  create(@Body() dto: CreateReportDto) {
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

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: Report) {
    return this.service.update(+id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.service.delete(+id);
  }
}
