import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Trip } from './trip.entity';
import { Repository } from 'typeorm';
import { CreateTripDto } from './create-trip.dto';
import { TripMapper } from './trip.mappers';
import { Between } from 'typeorm';
import { AuthenticatedUser } from 'src/shared/interfaces/authenticated-user.interface';

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

  async getUniqueDestinationsByCompany(companyId: string) {
    const raw = await this.repo.query(`
        SELECT DISTINCT 
          CONCAT(o.name, ' - ', d.name) AS "route"
        FROM trips t
        JOIN cities o ON o.id = t."originId"
        JOIN cities d ON d.id = t."destinationId"
        WHERE t."companyId" = $1
      `, [companyId]);

    return raw.map((r) => r.route);
  }

  async searchTrips(user: AuthenticatedUser, filters: any): Promise<Trip[]> {
    const query = this.repo.createQueryBuilder('trip')
      .leftJoinAndSelect('trip.origin', 'origin')
      .leftJoinAndSelect('trip.destination', 'destination')
      .leftJoinAndSelect('trip.user', 'user');
  
    if (user.role === 'company') {
      query.andWhere('trip.companyId = :companyId', { companyId: user.companyId });
    } else {
      query.andWhere('trip.user = :userId', { userId: user.userId });
    }
  
    if (filters.dateFrom) {
      query.andWhere('trip.startDate >= :dateFrom', { dateFrom: filters.dateFrom });
    }
  
    if (filters.dateTo) {
      query.andWhere('trip.startDate <= :dateTo', { dateTo: filters.dateTo });
    }
  
    if (filters.driver) {
      query.andWhere('user.id = :driverId', { driverId: filters.driver });
    }
  
    if (filters.destination) {
      query.andWhere(`CONCAT(origin.name, ' - ', destination.name) ILIKE :destination`, {
        destination: `%${filters.destination}%`
      });
    }
  
    if (filters.status) {
      query.andWhere('trip.status = :status', { status: filters.status });
    }
  
    return await query.orderBy('trip.startDate', 'DESC').getMany();
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
