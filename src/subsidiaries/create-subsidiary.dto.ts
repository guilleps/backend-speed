import { IsString } from 'class-validator';

export class CreateSubsidiaryDto {
  @IsString()
  name: string;

  @IsString()
  address: string;

  @IsString()
  tripId: string;
}
