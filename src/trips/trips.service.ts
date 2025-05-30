import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Trip } from './trip.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TripsService {
  constructor(@InjectRepository(Trip) private repo: Repository<Trip>) {}

  create(data: Partial<Trip>) {
    const trip = this.repo.create(data);
    return this.repo.save(trip);
  }

  findAll() {
    return this.repo.find();
  }

  findOne(id: string) {
    return this.repo.findOneBy({ id });
  }

  update(id: number, data: Partial<Trip>) {
    return this.repo.update(id, data);
  }

  delete(id: number) {
    return this.repo.delete(id);
  }
}
