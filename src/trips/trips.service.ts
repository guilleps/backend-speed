import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Trip } from './trip.entity';
import { Repository } from 'typeorm';
import { CreateTripDto } from './create-trip.dto';
import { TripMapper } from './trip.mappers';
import { Between } from 'typeorm';

@Injectable()
export class TripsService {
  constructor(@InjectRepository(Trip) private repo: Repository<Trip>) { }

  async create(data: CreateTripDto) {
    const trip = TripMapper.toEntity(data);
    return await this.repo.save(trip);
  }

  findByUserId(userId: string) {
    return this.repo.find({
      where: {
        user: {
          id: userId,
        },
      },
      relations: ['origin', 'destination', 'details'],
      order: { startDate: 'DESC' },
    });
  }

  findByCompanyId(companyId: string) {
    return this.repo.find({
      where: { companyId },
      relations: ['origin', 'destination', 'details', 'user'],
      order: { startDate: 'DESC' },
    });
  }

  async countCompanyTripsLastWeek(companyId: string): Promise<number> {
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0 (domingo) a 6 (sábado)

    // Ajustar a LUNES de la semana pasada
    const daysSinceMonday = (dayOfWeek + 6) % 7; // convierte domingo (0) en 6, lunes (1) en 0...
    const lastWeekMonday = new Date(today);
    lastWeekMonday.setDate(today.getDate() - daysSinceMonday - 7);
    lastWeekMonday.setHours(0, 0, 0, 0);

    // DOMINGO de la semana pasada
    const lastWeekSunday = new Date(lastWeekMonday);
    lastWeekSunday.setDate(lastWeekMonday.getDate() + 6);
    lastWeekSunday.setHours(23, 59, 59, 999);

    return this.repo.count({
      where: {
        companyId,
        startDate: Between(
          lastWeekMonday.toISOString(),
          lastWeekSunday.toISOString(),
        ),
      },
    });
  };

  async countByUserId(userId: string): Promise<number> {
    return this.repo.count({
      where: {
        user: { id: userId },
      },
    });
  }

  findAll() {
    return this.repo.find();
  }

  findOne(id: string) {
    return this.repo.findOneBy({ id });
  }

  update(id: string, data: Partial<Trip>) {
    return this.repo.update(id, data);
  }

  delete(id: number) {
    return this.repo.delete(id);
  }
}
