import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Chat } from 'src/typeorm/entities/Chat';
import { Repository } from 'typeorm';
import { ChatCreateDto } from './dto/chat-create.dto';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Chat)
    private repoChat: Repository<Chat>
  ) {}

  async newChat(newChat: ChatCreateDto) {
    const chat = await this.repoChat.findOne({
      where: { user_id: newChat.user_id }
    });
    if (chat) {
      return chat;
    }
    return await this.repoChat.save(newChat);
  }

  async getChat(id: number) {
    return await this.repoChat.findOne({ where: { user_id: id } });
  }
}
