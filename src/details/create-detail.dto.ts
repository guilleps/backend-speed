import { IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateDetailDto {
  @IsString()
  duration: string;

  @IsNumber()
  numberAlerts: number;

  @IsNumber()
  numberResponses: number;

  @IsNumber()
  effectiveness: number;

  @IsUUID()
  tripId: string;

  @IsOptional()
  dataCollected?: any;
}
