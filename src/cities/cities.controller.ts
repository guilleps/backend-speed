import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CitiesService } from './cities.service';
import { CreateCityDto } from './create-city.dto';
import { City } from './city.entity';
import { JwtGuard } from 'src/auth/jwt/jwt.guard';
import { CurrentCompany } from 'src/shared/decorators/current-company/current-company.decorator';
import { AuthenticatedUser } from 'src/shared/interfaces/authenticated-user.interface';

@Controller('cities')
@UsePipes(ValidationPipe)
export class CitiesController {
  constructor(private readonly service: CitiesService) {}

  @Post()
  @UseGuards(JwtGuard)
  create(
    @Body() dto: CreateCityDto,
    @CurrentCompany() company: AuthenticatedUser,
  ) {
    console.log('company', company);
    dto.companyId = company.companyId;
    return this.service.create(dto);
  }

  @Get()
  @UseGuards(JwtGuard)
  findAll(@CurrentCompany() company: AuthenticatedUser) {
    return this.service.findByCompanyId(company.companyId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: City) {
    return this.service.update(+id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.service.delete(+id);
  }
}
