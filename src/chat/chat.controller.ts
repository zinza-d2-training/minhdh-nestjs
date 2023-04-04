import { Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatCreateDto } from './dto/chat-create.dto';

@Controller('chats')
export class ChatController {
  constructor(private chatService: ChatService) {}

  @Get(':id')
  async getChat(@Param('id', ParseIntPipe) id: number) {
    return await this.chatService.getChat(id);
  }

  @Post()
  async newChat(newChat: ChatCreateDto) {
    return await this.chatService.newChat(newChat);
  }
}
