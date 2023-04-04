import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from 'src/typeorm/entities/Message';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';
import { Chat } from 'src/typeorm/entities/Chat';

@Module({
  imports: [TypeOrmModule.forFeature([Message, Chat])],
  controllers: [MessageController],
  providers: [MessageService]
})
export class MessageModule {}
