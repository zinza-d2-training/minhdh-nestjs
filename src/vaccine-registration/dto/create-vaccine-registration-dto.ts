import { IsNotEmpty } from 'class-validator';

export class CreateVaccineRegistrationDto {
  numBHYT: number;

  address: string;

  job: string;

  work_unit: string;

  date_injection: Date;

  session_injection: string;

  @IsNotEmpty()
  user_id: number;

  @IsNotEmpty()
  group_id: number;
}
