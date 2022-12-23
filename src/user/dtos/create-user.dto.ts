import {
  IsEmail,
  IsDefined,
  IsNotEmpty,
  MinLength,
  Length
} from 'class-validator';

export class CreateUserDto {
  @IsDefined()
  name: string;

  @IsEmail()
  @IsDefined()
  email: string;

  @IsDefined()
  @Length(12)
  identity_card_number: string;

  @IsDefined()
  @MinLength(8)
  password: string;

  @IsNotEmpty()
  birthday: string;

  @IsNotEmpty()
  gender: string;

  @IsNotEmpty()
  ward_id: number;
}
