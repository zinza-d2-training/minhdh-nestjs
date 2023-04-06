import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Chat } from 'src/typeorm/entities/Chat';
import { Repository } from 'typeorm';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Chat)
    private repoChat: Repository<Chat>
  ) {}

  async getChat(id: number) {
    return await this.repoChat.findOne({ where: { user_id: id } });
  }

  async getChatById(id: number) {
    return await this.repoChat.findOne({ where: { id: id } });
  }
}
