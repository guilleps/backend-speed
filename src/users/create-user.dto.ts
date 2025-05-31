import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { UserRole } from './user.entity';

export class CreateUserDto {
  @IsEnum(UserRole)
  role: UserRole;

  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  companyId?: string;
}
