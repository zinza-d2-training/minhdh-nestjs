import { IsEmail, IsDefined, IsNotEmpty } from 'class-validator';

export class loginDto {
  @IsNotEmpty()
  id: number;

  @IsDefined()
  name: string;

  @IsEmail()
  @IsDefined()
  email: string;

  @IsDefined()
  identity_card_number: string;

  @IsNotEmpty()
  birthday: Date;

  @IsNotEmpty()
  gender: string;

  @IsNotEmpty()
  ward_id: number;

  reset_token: string;
}
