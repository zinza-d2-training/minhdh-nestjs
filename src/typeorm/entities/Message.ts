import { Chat } from './Chat';
import { File } from './File';
import { User } from './User';
import {
  Entity,
  Column,
  Timestamp,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  OneToOne
} from 'typeorm';
@Entity('messages')
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @Column()
  type: string;

  @Column()
  chat_id: number;

  @Column()
  sender_id: number;

  @Column()
  receiver_id: number;

  @Column({ nullable: true })
  file_id: number;

  @OneToOne(() => File, (file) => file.message)
  @JoinColumn({ name: 'file_id' })
  file: File;

  @ManyToOne(() => User, (user) => user.send_messages)
  @JoinColumn({ name: 'sender_id' })
  sender: User;

  @ManyToOne(() => User, (user) => user.receive_messages)
  @JoinColumn({ name: 'receiver_id' })
  receiver: User;

  @ManyToOne(() => Chat, (chat) => chat.messages)
  @JoinColumn({ name: 'chat_id' })
  chat: Chat;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: true
  })
  created_at: Timestamp;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: true
  })
  updated_at: Timestamp;
}
