import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { DetailsService } from './details.service';
import { Detail } from './detail.entity';
import { AlertRecordDto } from './dto/alert-record.dto';

@Controller('details')
@UsePipes(ValidationPipe)
export class DetailsController {
  constructor(private readonly service: DetailsService) {}

  @Post('/register/:tripId')
  async create(
    @Param('tripId') tripId: string,
    @Body() alertas: AlertRecordDto[],
  ) {
    return this.service.create(tripId, alertas);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get('by-trip/:tripId')
  findByTripId(@Param('tripId') tripId: string) {
    return this.service.findByTripId(tripId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: Detail) {
    return this.service.update(+id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.service.delete(+id);
  }
}
