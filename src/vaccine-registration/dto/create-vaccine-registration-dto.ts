import { IsNotEmpty } from 'class-validator';

export class CreateVaccineRegistrationDto {
  @IsNotEmpty()
  numBHYT: number;

  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  job: string;

  @IsNotEmpty()
  work_unit: string;

  @IsNotEmpty()
  date_injection: Date;

  @IsNotEmpty()
  session_injection: string;

  @IsNotEmpty()
  user_id: number;

  @IsNotEmpty()
  group_id: number;
}
