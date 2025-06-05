import { IsEmail, IsString } from 'class-validator';

export class CreateCompanyDto {
  
  @IsString()
  name: string;

  @IsString()
  ruc: string;

  @IsString()
  address: string;

  @IsString()
  phone: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
