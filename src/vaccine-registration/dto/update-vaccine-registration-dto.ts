import { IsNumber } from 'class-validator';

export class UpdateVaccineRegistrationDto {
  @IsNumber()
  numBHYT: number;

  address: string;

  job: string;

  word_unit: string;

  date_injection: Date;

  session_injection: string;

  @IsNumber()
  user_id: number;

  @IsNumber()
  vaccine_id: number;

  @IsNumber()
  group_id: number;

  @IsNumber()
  vaccination_site_id: number;
}
