import { IsEmail, IsDefined, IsNotEmpty, MinLength } from 'class-validator';

export class UpdateUser {
  @IsDefined()
  name: string;

  @IsEmail()
  @IsDefined()
  email: string;

  @IsDefined()
  identity_card_number: string;

  @IsDefined()
  @MinLength(8)
  password: string;

  @IsNotEmpty()
  birthday: Date;

  @IsNotEmpty()
  gender: string;

  @IsNotEmpty()
  ward_id: number;

  reset_token: string;
}
