import { IsDefined } from 'class-validator';

export class MessageCreateDto {
  @IsDefined()
  text: string;

  @IsDefined()
  chat_id: number;

  @IsDefined()
  sender_id: number;

  @IsDefined()
  receiver_id: number;

  @IsDefined()
  type: string;
}
