import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TripsService } from './trips.service';
import { CreateTripDto } from './create-trip.dto';
import { Trip } from './trip.entity';
import { CitiesService } from 'src/cities/cities.service';
import { CurrentUser } from 'src/shared/decorators/current-user/current-user.decorator';
import { AuthenticatedUser } from 'src/shared/interfaces/authenticated-user.interface';
import { JwtGuard } from 'src/auth/jwt/jwt.guard';
import { JwtUserGuard } from 'src/auth/jwt/jwt-user.guard';
import { UpdateTripDto } from './update-trip.dto';

@Controller('trips')
export class TripsController {
  constructor(
    private readonly service: TripsService,
    private readonly citiesService: CitiesService,
  ) { }

  @Post()
  @UseGuards(JwtGuard, JwtUserGuard)
  create(@Body() dto: CreateTripDto, @CurrentUser() user: AuthenticatedUser) {
    dto.userId = user.userId;
    dto.companyId = user.companyId;

    this.citiesService.findByCompanyId(user.companyId);

    return this.service.create(dto);
  }

  @Get('by-user')
  @UseGuards(JwtGuard, JwtUserGuard)
  getByUser(@CurrentUser() user: AuthenticatedUser) {
    return this.service.findByUserId(user.userId);
  }

  @Get('by-company')
  @UseGuards(JwtGuard, JwtUserGuard)
  getByCompany(@CurrentUser() user: AuthenticatedUser) {
    return this.service.findByCompanyId(user.companyId);
  }

  @Get('count/company/last-week')
  @UseGuards(JwtGuard, JwtUserGuard)
  countTripsLastWeek(@CurrentUser() user: AuthenticatedUser) {
    return this.service.countCompanyTripsLastWeek(user.companyId);
  }

  @Get('count/company/current-week')
  @UseGuards(JwtGuard, JwtUserGuard)
  countTripsCurrentWeek(@CurrentUser() user: AuthenticatedUser) {
    return this.service.countCompanyTripsCurrentWeek(user.companyId);
  }

  @Get('count/by-user')
  @UseGuards(JwtGuard, JwtUserGuard)
  countByUser(@CurrentUser() user: AuthenticatedUser) {
    return this.service.countByUserId(user.userId);
  }

  @Get('/destinations/by-company/:companyId')
  getUniqueDestinations(@Param('companyId') companyId: string) {
    return this.service.getUniqueDestinationsByCompany(companyId);
  }

  @Get('/destinations/by-user')
  @UseGuards(JwtGuard, JwtUserGuard)
  getUniqueDestinationsByUser(@CurrentUser() user: AuthenticatedUser) {
    return this.service.getUniqueDestinationsByUser(user.userId);
  }

  @Get('search')
  @UseGuards(JwtGuard)
  searchReports(
    @CurrentUser() user: AuthenticatedUser,
    @Query('dateFrom') dateFrom?: string,
    @Query('dateTo') dateTo?: string,
    @Query('driver') driver?: string,
    @Query('destination') destination?: string,
    @Query('status') status?: string
  ) {
    return this.service.searchTrips(user, { dateFrom, dateTo, driver, destination, status });
  }

  @Get('/dynamic')
  @UseGuards(JwtGuard)
  getDynamicReports(@CurrentUser() user: AuthenticatedUser) {
    if (user.role === 'company') {
      return this.service.getTripsByCompany(user.companyId);
    } else {
      return this.service.getTripsByDriver(user.userId);
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTripDto: UpdateTripDto) {
    return this.service.update(id, updateTripDto);
  }
}
