import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from 'src/typeorm/entities/Message';
import { Repository } from 'typeorm';
import { MessageCreateDto } from './dto/message-create.dto';
import { Chat } from 'src/typeorm/entities/Chat';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private repoMessage: Repository<Message>,
    @InjectRepository(Chat)
    private repoChat: Repository<Chat>
  ) {}

  async newMessage(newMessage: MessageCreateDto) {
    await this.repoMessage.save(newMessage);
    await this.repoChat.update(
      { id: newMessage.chat_id },
      { message_flat: newMessage.text, updated_at: new Date() }
    );
    return await this.repoMessage.findOne({
      where: { chat_id: newMessage.chat_id }
    });
  }

  async getMessages(id: number) {
    return await this.repoMessage.find({ where: { chat_id: id } });
  }
}
