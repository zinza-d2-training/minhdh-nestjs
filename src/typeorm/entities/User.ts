import { VaccineRegistration } from './VaccineRegistration';
import { Exclude } from 'class-transformer';
import { IsEmail } from 'class-validator';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Timestamp,
  ManyToOne,
  JoinColumn,
  OneToMany,
  OneToOne
} from 'typeorm';
import { Ward } from './Ward';
import { Message } from './Message';
import { Chat } from './Chat';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 0 })
  isAdmin: number;

  @Column()
  name: string;

  @IsEmail()
  @Column({ unique: true })
  email: string;

  @Exclude()
  @Column()
  password: string;

  @Column({ unique: true })
  identity_card_number: string;

  @Column()
  birthday: Date;

  @Column()
  gender: string;

  @ManyToOne(() => Ward, (ward) => ward.users)
  @JoinColumn({ name: 'ward_id' })
  ward: Ward;

  @Column()
  ward_id: number;

  @Column({ nullable: true })
  chat_id: number;

  @Column({ nullable: true })
  reset_token: string;

  @OneToOne(() => Chat, (chat) => chat.user)
  @JoinColumn({ name: 'chat_id' })
  chat: Chat;

  @OneToMany(
    () => VaccineRegistration,
    (vaccineRegistration) => vaccineRegistration.user
  )
  vaccineRegistrations: VaccineRegistration[];

  @OneToMany(() => Message, (message) => message.sender)
  send_messages: Message[];

  @OneToMany(() => Message, (message) => message.receiver)
  receive_messages: Message[];

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
