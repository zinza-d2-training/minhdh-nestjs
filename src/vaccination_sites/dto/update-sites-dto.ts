import { IsNotEmpty, IsNumber } from 'class-validator';
export class UpdateSitesDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  leader: string;

  @IsNotEmpty()
  @IsNumber()
  number_table: number;
}
