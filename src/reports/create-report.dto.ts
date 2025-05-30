import { IsNumber, IsString } from 'class-validator';

export class CreateReportDto {
  @IsString()
  dateGeneration: string;

  @IsString()
  travelStartDate: string;

  @IsString()
  travelEndDate: string;

  @IsString()
  source: string;

  @IsString()
  destination: string;

  @IsString()
  duration: string;

  @IsNumber()
  totalAlerts: number;

  @IsNumber()
  alertsAttended: number;

  @IsString()
  userId: string;
}
