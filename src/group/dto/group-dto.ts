import { IsNotEmpty } from 'class-validator';

export class GroupDto {
  @IsNotEmpty()
  name: string;
}
