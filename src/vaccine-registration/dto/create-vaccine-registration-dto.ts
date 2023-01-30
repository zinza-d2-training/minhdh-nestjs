import { IsNotEmpty } from 'class-validator';

export class CreateVaccineRegistrationDto {
  numBHYT?: string | null | undefined;

  address?: string | null | undefined;

  job?: string | null | undefined;

  work_unit?: string | null | undefined;

  date_injection?: Date | null | undefined;

  session_injection?: string | null | undefined;

  vaccine_code?: string | null | undefined;

  vaccination_site_id?: number | null | undefined;

  vaccine_id?: number | null | undefined;

  @IsNotEmpty()
  status: number;

  @IsNotEmpty()
  registration_code: string;

  @IsNotEmpty()
  user_id: number;

  @IsNotEmpty()
  group_id: number;
}
