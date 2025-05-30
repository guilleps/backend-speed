import { Company } from './company.entity';
import { CreateCompanyDto } from './create-company.dto';

export class CompanyMapper {
  static toEntity(dto: CreateCompanyDto): Company {
    const user = new Company();
    user.name = dto.name;
    user.ruc = dto.ruc;
    user.address = dto.address;
    user.phone = dto.phone;
    user.email = dto.email;
    user.password = dto.password;
    return user;
  }

  static toDto(entity: Company): CreateCompanyDto {
    const dto = new CreateCompanyDto();
    dto.name = entity.name;
    dto.ruc = entity.ruc;
    dto.address = entity.address;
    dto.phone = entity.phone;
    dto.email = entity.email;
    dto.password = entity.password;
    return dto;
  }
}
