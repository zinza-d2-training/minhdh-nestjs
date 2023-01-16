import { IsNumber } from 'class-validator';
export class UpdateSitesDto {
  name: string;

  address: string;

  leader: string;

  @IsNumber()
  number_table: number;
}
