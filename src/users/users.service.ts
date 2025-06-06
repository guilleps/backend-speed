import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './create-user.dto';
import { UserMapper } from './user.mappers';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) { }

  async create(dto: CreateUserDto) {
    const user = UserMapper.toEntity(dto);
    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(dto.password, salt);
    return this.repo.save(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.repo.findOne({ where: { email }, relations: ['company'] });
  }

  countDriversByCompany(companyId: string): Promise<number> {
    return this.repo.count({
      where: {
        company: { id: companyId },
      },
    });
  }

  findDriversByCompany(companyId: string) {
    return this.repo.find({
      where: { company: { id: companyId } },
      select: ['id', 'name'],
      order: { name: 'ASC' }
    });
  }

  findAll() {
    return this.repo.find();
  }

  findOne(id: string) {
    return this.repo.findOneBy({ id });
  }

  update(id: number, data: User) {
    return this.repo.update(id, data);
  }

  delete(id: string) {
    return this.repo.delete(id);
  }
}
