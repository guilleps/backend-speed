import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { TripsService } from './trips.service';
import { CreateTripDto } from './create-trip.dto';
import { Trip } from './trip.entity';
import { JwtGuard } from 'src/auth/jwt/jwt.guard';
import { CitiesService } from 'src/cities/cities.service';
import { CurrentUser } from 'src/shared/decorators/current-user/current-user.decorator';
import { JwtUserGuard } from 'src/auth/jwt/jwt-user.guard';
import { AuthenticatedUser } from 'src/shared/interfaces/authenticated-user.interface';

@Controller('trips')
export class TripsController {
  constructor(
    private readonly service: TripsService,
    private readonly citiesService: CitiesService,
  ) {}

  @Post()
  @UseGuards(JwtGuard, JwtUserGuard)
  create(
    @Body() dto: CreateTripDto,
    @CurrentUser() user: AuthenticatedUser,
  ) {    
    dto.userId = user.userId;
    dto.companyId = user.companyId;

    this.citiesService.findByCompanyId(user.companyId);

    return this.service.create(dto);
  }

  @Get('available-cities')
  getAvailableCities(@CurrentUser() user: AuthenticatedUser) {
    return this.citiesService.findByCompanyId(user.companyId);
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
    return this.service.update(id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.service.delete(+id);
  }
}
