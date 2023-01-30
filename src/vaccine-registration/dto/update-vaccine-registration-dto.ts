import { IsNumber } from 'class-validator';

export class UpdateVaccineRegistrationDto {
  numBHYT: string;

  address: string;

  job: string;

  word_unit: string;

  date_injection: Date;

  session_injection: string;

  vaccine_code: string;

  status: number;

  @IsNumber()
  user_id: number;

  @IsNumber()
  vaccine_id: number;

  @IsNumber()
  group_id: number;

  @IsNumber()
  vaccination_site_id: number;
}
