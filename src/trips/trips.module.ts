import { Module } from '@nestjs/common';
import { TripsController } from './trips.controller';
import { TripsService } from './trips.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Trip } from './trip.entity';
import { CitiesModule } from 'src/cities/cities.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Trip]),
    CitiesModule
  ],
  controllers: [TripsController],
  providers: [TripsService],
})
export class TripsModule {}
