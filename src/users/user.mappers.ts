import { Company } from 'src/companies/company.entity';
import { CreateUserDto } from './create-user.dto';
import { User } from './user.entity';

export class UserMapper {
  static toEntity(dto: CreateUserDto): User {
    const user = new User();
    user.name = dto.name;
    user.email = dto.email;
    user.password = dto.password;
    user.role = dto.role;

    if (dto.companyId) {
      const company = new Company();
      company.id = dto.companyId;
      user.company = company;
    }

    return user;
  }

  static toDto(entity: User): CreateUserDto {
    const dto = new CreateUserDto();
    dto.name = entity.name;
    dto.email = entity.email;
    dto.password = entity.password;
    dto.companyId = entity.company?.id;
    dto.role = entity.role;
    return dto;
  }
}
