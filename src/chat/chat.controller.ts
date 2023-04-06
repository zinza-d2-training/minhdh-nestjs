import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('chats')
export class ChatController {
  constructor(private chatService: ChatService) {}

  @Get(':id')
  async getChatByUserId(@Param('id', ParseIntPipe) id: number) {
    return await this.chatService.getChat(id);
  }

  @Get(':id/chat')
  async getChatById(@Param('id', ParseIntPipe) id: number) {
    return await this.chatService.getChatById(id);
  }
}
