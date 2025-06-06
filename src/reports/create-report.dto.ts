import { IsString } from 'class-validator';

export class CreateReportDto {
  @IsString()
  dateFrom?: string;

  @IsString()
  dateTo?: string;

  @IsString()
  driver?: string;

  @IsString()
  destination?: string;

  @IsString()
  status?: string;
}
