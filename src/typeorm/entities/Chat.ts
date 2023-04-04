import {
  Entity,
  Column,
  Timestamp,
  PrimaryGeneratedColumn,
  OneToMany
} from 'typeorm';
import { Message } from './Message';

@Entity('chats')
export class Chat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  message_flat: string;

  @Column()
  user_id: number;

  @OneToMany(() => Message, (message) => message.chat)
  messages: Message[];

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
