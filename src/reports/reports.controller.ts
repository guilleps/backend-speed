import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { Trip } from 'src/trips/trip.entity';
import { Detail } from 'src/details/detail.entity';

@Controller('reports')
export class ReportsController {
  constructor(private readonly service: ReportsService) {}

  @Post()
  create(@Body() trip: Trip, @Body() detail: Detail) {
    return this.service.create(trip, detail);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }
}
