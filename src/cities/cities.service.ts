import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { City } from './city.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CitiesService {
  constructor(@InjectRepository(City) private repo: Repository<City>) {}

  create(data: Partial<City>) {
    const city = this.repo.create(data);
    return this.repo.save(city);
  }

  findAll() {
    return this.repo.find();
  }

  findOne(id: string) {
    return this.repo.findOneBy({ id });
  }

  update(id: number, data: Partial<City>) {
    return this.repo.update(id, data);
  }

  delete(id: number) {
    return this.repo.delete(id);
  }
}
