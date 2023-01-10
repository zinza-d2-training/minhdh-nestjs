import { IsNotEmpty, IsNumber } from 'class-validator';

export class VaccinationSitesDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  leader: string;

  @IsNotEmpty()
  number_table: number;

  @IsNotEmpty()
  @IsNumber()
  ward_id: number;
}
