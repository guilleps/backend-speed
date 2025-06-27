import { IsOptional, IsString, IsEnum, IsObject } from 'class-validator';
import { Status } from './trip.entity';


export class UpdateTripDto {
  @IsOptional()
  @IsString()
  endDate?: string;

  @IsOptional()
  @IsEnum(Status)
  status?: Status;

  @IsOptional()
  @IsObject()
  inputConduct?: Record<string, number>;
}
