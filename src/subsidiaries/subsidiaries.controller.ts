import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { SubsidiariesService } from './subsidiaries.service';
import { CreateSubsidiaryDto } from './create-subsidiary.dto';
import { Subsidiary } from './subsidiary.entity';

@Controller('subsidiaries')
export class SubsidiariesController {
  constructor(private readonly service: SubsidiariesService) {}

  @Post()
  create(@Body() dto: CreateSubsidiaryDto) {
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
  update(@Param('id') id: string, @Body() body: Subsidiary) {
    return this.service.update(+id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.service.delete(+id);
  }
}
