import { IsNotEmpty } from 'class-validator';

export class UpdateDocumentDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  date_release: Date;

  @IsNotEmpty()
  link: string;
}
