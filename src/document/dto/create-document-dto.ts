import { IsNotEmpty } from 'class-validator';

export class CreateDocumentDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  date_release: Date;

  @IsNotEmpty()
  link: string;
}
