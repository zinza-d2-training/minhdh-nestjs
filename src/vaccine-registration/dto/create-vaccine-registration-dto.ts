import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateVaccineRegistrationDto {
  @IsNotEmpty()
  @IsNumber()
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
  @IsNumber()
  user_id: number;

  @IsNotEmpty()
  @IsNumber()
  group_id: number;
}
