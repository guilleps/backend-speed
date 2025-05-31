import { IsOptional, IsString } from 'class-validator';

export class CreateCityDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  companyId?: string;
}
