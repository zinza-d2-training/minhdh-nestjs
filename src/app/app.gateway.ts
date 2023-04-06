import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  MessageBody
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Message } from 'src/typeorm/entities/Message';
import { addUser, getUser } from './function';

@WebSocketGateway(8001, { cors: 'http:localhost:3000' })
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  private logger: Logger = new Logger('AppGateway');

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  afterInit(server: any) {
    this.logger.log('init');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleConnection(client: Socket) {
    this.logger.log('connected');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleDisconnect(client: Socket) {
    this.logger.log('disconnected');
  }

  @SubscribeMessage('send message to admin')
  handleMessageToAdmin(@MessageBody() message: Message): void {
    this.server.emit('message received from user', message);
  }

  @SubscribeMessage('send message to user')
  handleMessageToUser(@MessageBody() message: Message): void {
    this.server.emit('message received from admin', message);
  }

  @SubscribeMessage('typing to user')
  handleTypingToUser(): void {
    this.server.emit('typing from admin');
  }

  @SubscribeMessage('typing to admin')
  handleTypingToAdmin(): void {
    this.server.emit('typing from user');
  }

  @SubscribeMessage('stop typing to user')
  handleStopTypingToUser(): void {
    this.server.emit('stop typing from admin');
  }

  @SubscribeMessage('stop typing to admin')
  handleStopTypingToAdmin(): void {
    this.server.emit('stop typing from user');
  }
}
