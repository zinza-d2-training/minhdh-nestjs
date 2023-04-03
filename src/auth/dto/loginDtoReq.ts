import { IsEmail, IsDefined } from 'class-validator';

export class loginDtoReq {
  @IsEmail()
  @IsDefined()
  email: string;

  @IsDefined()
  password: string;
}
