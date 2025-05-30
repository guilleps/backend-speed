import { IsString } from 'class-validator';

export class CreateDetailDto {
  @IsString()
  duration: string;

  @IsString()
  numberAlerts: string;

  @IsString()
  numberResponses: string;

  @IsString()
  effectiveness: string;
}
