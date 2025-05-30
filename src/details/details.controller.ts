import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { DetailsService } from './details.service';
import { CreateDetailDto } from './create-detail.dto';
import { Detail } from './detail.entity';

@Controller('details')
export class DetailsController {
  constructor(private readonly service: DetailsService) {}

  @Post()
  create(@Body() dto: CreateDetailDto) {
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
  update(@Param('id') id: string, @Body() body: Detail) {
    return this.service.update(+id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.service.delete(+id);
  }
}
