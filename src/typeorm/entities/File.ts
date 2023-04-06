import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  Timestamp
} from 'typeorm';
import { Message } from './Message';

@Entity('files')
export class File {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  hash: string;

  @Column()
  path: string;

  @Column()
  key: string;

  @Column()
  message_id: number;

  @OneToOne(() => Message, (message) => message.file)
  @JoinColumn({ name: 'message_id' })
  message: Message;

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
