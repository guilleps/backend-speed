import { IsEnum, IsString } from 'class-validator';
import { Status } from './trip.entity';

export class CreateTripDto {
  @IsEnum(Status)
  status: Status;

  @IsString()
  startDate: string;

  @IsString()
  endDate: string;

  @IsString()
  source: string;

  @IsString()
  destination: string;

  @IsString()
  userId: string;
}
