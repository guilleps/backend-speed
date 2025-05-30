import { IsEmail, IsString } from 'class-validator';
import { Unique } from 'typeorm';

export class CreateCompanyDto {
  @IsString()
  name: string;

  @IsString()
  @Unique(['ruc'])
  ruc: string;

  @IsString()
  address: string;

  @IsString()
  phone: string;

  @IsEmail()
  @Unique(['email'])
  email: string;

  @IsString()
  password: string;
}
