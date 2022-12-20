import {
  IsEmail,
  IsDefined,
  IsNotEmpty,
  MinLength,
  Length,
} from 'class-validator';

export class CreateUserDto {
  @IsDefined()
  name: string;

  @IsEmail()
  @IsDefined()
  email: string;

  @IsDefined()
  @Length(12)
  cmnd: string;

  @IsDefined()
  @MinLength(8)
  password: string;

  @IsNotEmpty()
  birthday: string;

  @IsNotEmpty()
  gender: string;

  @IsNotEmpty()
  wardId: number;
}
