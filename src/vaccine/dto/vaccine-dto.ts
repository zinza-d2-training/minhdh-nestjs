import { IsNotEmpty } from 'class-validator';

export class VaccineDto {
  @IsNotEmpty()
  name: string;
}
