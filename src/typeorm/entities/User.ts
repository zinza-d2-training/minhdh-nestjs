import { IsEmail } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn, Timestamp } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: false })
  isAdmin: boolean;

  @Column()
  name: string;

  @IsEmail()
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ unique: true })
  identity_card_number: string;

  @Column()
  birthday: Date;

  @Column()
  gender: string;

  @Column()
  ward_id: number;

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
