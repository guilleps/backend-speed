import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Detail } from './detail.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DetailsService {
  constructor(@InjectRepository(Detail) private repo: Repository<Detail>) {}

  create(data: Partial<Detail>) {
    const detail = this.repo.create(data);
    return this.repo.save(detail);
  }

  findAll() {
    return this.repo.find();
  }

  findOne(id: string) {
    return this.repo.findOneBy({ id });
  }

  update(id: number, data: Partial<Detail>) {
    return this.repo.update(id, data);
  }

  delete(id: number) {
    return this.repo.delete(id);
  }
}
