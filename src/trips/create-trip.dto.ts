import { IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';
import { Status } from './trip.entity';
import { UUID } from 'crypto';

export class CreateTripDto {

  @IsString()
  startDate: string;

  @IsString()
  endDate: string;

  @IsUUID()
  origin: UUID;

  @IsUUID()
  destination: UUID;

  @IsEnum(Status)
  status: Status;

  @IsString()
  userId?: string;

  @IsString()
  @IsOptional()
  companyId?: string;
}
