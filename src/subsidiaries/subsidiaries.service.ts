import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Subsidiary } from './subsidiary.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SubsidiariesService {
  constructor(
    @InjectRepository(Subsidiary) private repo: Repository<Subsidiary>,
  ) {}

  create(data: Partial<Subsidiary>) {
    const subsidiary = this.repo.create(data);
    return this.repo.save(subsidiary);
  }

  findAll() {
    return this.repo.find();
  }

  findOne(id: string) {
    return this.repo.findOneBy({ id });
  }

  update(id: number, data: Partial<Subsidiary>) {
    return this.repo.update(id, data);
  }

  delete(id: number) {
    return this.repo.delete(id);
  }
}
