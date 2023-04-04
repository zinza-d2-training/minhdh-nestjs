import { IsDefined } from 'class-validator';

export class ChatCreateDto {
  message_flat?: string | null;

  @IsDefined()
  user_id: number;
}
