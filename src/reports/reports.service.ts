import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Report } from './report.entity';
import { Repository } from 'typeorm';
import { Trip } from 'src/trips/trip.entity';
import { Detail } from 'src/details/detail.entity';

@Injectable()
export class ReportsService {
  constructor(@InjectRepository(Report) private repo: Repository<Report>) {}

  async create(trip: Trip, detail?: Detail) {
    const duration =
      new Date(trip.endDate).getTime() - new Date(trip.startDate).getTime();
    const durationMinutes = Math.floor(duration / 60000);

    const report = this.repo.create({
      dateGeneration: new Date().toISOString(),
      travelStartDate: trip.startDate,
      travelEndDate: trip.endDate,
      source: trip.origin.name,
      destination: trip.destination.name,
      duration: `${durationMinutes} minutes`,
      totalAlerts: 0,
      alertsAttended: 0,
      userId: trip.user.id,
    });

    // if (detail) {
    //   report.effectiveness =
    //     detail.numberAlerts > 0
    //       ? detail.numberResponses / detail.numberAlerts
    //       : 1;
    // }

    return this.repo.save(report);
  }

  findAll() {
    return this.repo.find();
  }

  findOne(id: string) {
    return this.repo.findOneBy({ id });
  }
}
