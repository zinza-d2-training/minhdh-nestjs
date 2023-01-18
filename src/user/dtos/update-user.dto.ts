import { IsEmail, MinLength } from 'class-validator';

export class UpdateUser {
  name: string;

  @IsEmail()
  email: string;

  identity_card_number: string;

  @MinLength(8)
  password: string;

  birthday: Date;

  gender: string;

  ward_id: number;

  reset_token: string;
}
