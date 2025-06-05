import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Detail } from './detail.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DetailsService {
  constructor(@InjectRepository(Detail) private repo: Repository<Detail>) {}

  create(data: Partial<Detail>) {
    const detail = this.repo.create({
      ...data,
      effectiveness:
        (data.numberAlerts ?? 0) > 0
          ? (data.numberResponses ?? 0) / (data.numberAlerts ?? 1)
          : 1,
    });
    return this.repo.save(detail);
  }

  findAll() {
    return this.repo.find();
  }

  findOne(id: string) {
    return this.repo.findOneBy({ id });
  }

  findByTripId(tripId: string) {
    return this.repo.findOne({ where: { tripId } });
  }

  update(id: number, data: Partial<Detail>) {
    return this.repo.update(id, data);
  }

  delete(id: number) {
    return this.repo.delete(id);
  }
}
