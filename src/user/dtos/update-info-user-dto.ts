import { IsNotEmpty } from 'class-validator';
export class UpdateInfoUser {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  identity_card_number: string;

  @IsNotEmpty()
  birthday: Date;

  @IsNotEmpty()
  gender: string;

  @IsNotEmpty()
  ward_id: number;
}
