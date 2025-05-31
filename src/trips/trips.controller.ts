import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { TripsService } from './trips.service';
import { CreateTripDto } from './create-trip.dto';
import { Trip } from './trip.entity';
import { CurrentCompany } from 'src/shared/decorators/current-company/current-company.decorator';
import { JwtGuard } from 'src/auth/jwt/jwt.guard';
import { CitiesService } from 'src/cities/cities.service';
import { JwtUserGuard } from 'src/auth/jwt/jwt-user.guard';

@Controller('trips')
@UseGuards(JwtGuard)
export class TripsController {
  constructor(
    private readonly service: TripsService,
    private readonly citiesService: CitiesService
  ) { }

  @Post()
  @UseGuards(JwtUserGuard)
  async create(@Body() dto: CreateTripDto, @Request() req) {
    const user = req.user;
    dto.userId = user.userId;
    dto.companyId = user.companyId;
  
    const companyCities = await this.citiesService.findByCompanyId(user.companyId);
  
    const originCity = companyCities.find(city => city.id === dto.origin);
    const destinationCity = companyCities.find(city => city.id === dto.destination);

    if (!originCity || !destinationCity) {
      throw new BadRequestException('Origen o destino no pertenecen a las ciudades de la empresa');
    }

    // Crear el viaje
    return this.service.create(dto);
  }

  @Get('available-cities')
  async getAvailableCities(@CurrentCompany() company) {
    // Devuelve solo ciudades de la empresa autenticada
    return this.citiesService.findByCompanyId(company.companyId);
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
