import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post
} from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageCreateDto } from './dto/message-create.dto';

@Controller('messages')
export class MessageController {
  constructor(private messageService: MessageService) {}

  @Get(':id')
  async getMessages(@Param('id', ParseIntPipe) id: number) {
    return await this.messageService.getMessages(id);
  }

  @Post()
  async newMessage(@Body() newMessage: MessageCreateDto) {
    return await this.messageService.newMessage(newMessage);
  }
}
