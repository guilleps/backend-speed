import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TripsService } from './trips.service';
import { CreateTripDto } from './create-trip.dto';
import { Trip } from './trip.entity';

@Controller('trips')
export class TripsController {
  constructor(private readonly service: TripsService) {}

  @Post()
  create(@Body() dto: CreateTripDto) {
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
  update(@Param('id') id: string, @Body() body: Trip) {
    return this.service.update(+id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.service.delete(+id);
  }
}
