import { IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';
import { Status } from './trip.entity';
import { UUID } from 'crypto';

export class CreateTripDto {
  @IsString()
  startDate: string;

  @IsString()
  @IsOptional()
  endDate?: string;

  @IsUUID()
  origin: UUID;

  @IsUUID()
  destination: UUID;

  @IsEnum(Status)
  @IsOptional()
  status: Status;

  @IsOptional()
  @IsString()
  conduct?: string;

  @IsString()
  userId?: string;

  @IsString()
  @IsOptional()
  companyId?: string;
}
