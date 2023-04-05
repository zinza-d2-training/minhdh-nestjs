import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post
} from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatCreateDto } from './dto/chat-create.dto';

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

  @Post()
  async newChat(@Body() newChat: ChatCreateDto) {
    return await this.chatService.newChat(newChat);
  }
}
