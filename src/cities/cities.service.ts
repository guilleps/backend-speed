import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { City } from './city.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CitiesService {
  constructor(@InjectRepository(City) private repo: Repository<City>) { }

  create(data: Partial<City>) {
    const city = this.repo.create(data);
    this.repo.save(city);

    return { id: city.id, name: city.name, address: city.address };
  }

  findAll() {
    return this.repo.find();
  }

  findByCompanyId(companyId: string) {
    return this.repo.find({ where: { companyId } });
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
