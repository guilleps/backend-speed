import { CreateUserDto } from './create-user.dto';
import { User } from './user.entity';

export class UserMapper {
  static toEntity(dto: CreateUserDto): User {
    const user = new User();
    user.name = dto.name;
    user.email = dto.email;
    user.password = dto.password;
    if(dto.companyId) user.companyId = dto.companyId;
    user.role = dto.role;
    return user;
  }

  static toDto(entity: User): CreateUserDto {
    const dto = new CreateUserDto();
    dto.name = entity.name;
    dto.email = entity.email;
    dto.password = entity.password;
    dto.companyId = entity.companyId;
    dto.role = entity.role;
    return dto;
  }
}
