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
    console.log(newChat);
    const chat = await this.repoChat.findOne({
      where: { user_id: newChat.user_id }
    });
    if (chat) {
      return chat;
    }
    const a = this.repoChat.create(newChat);
    await this.repoChat.save(a);
    const chatNew = await this.repoChat.findOne({
      where: { user_id: newChat.user_id }
    });
    return chatNew;
  }

  async getChat(id: number) {
    return await this.repoChat.findOne({ where: { user_id: id } });
  }
}
