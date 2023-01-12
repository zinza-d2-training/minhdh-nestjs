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
  OneToMany
} from 'typeorm';
import { Ward } from './Ward';

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
  reset_token: string;

  @OneToMany(
    () => VaccineRegistration,
    (vaccineRegistration) => vaccineRegistration.user
  )
  vaccineRegistrations: VaccineRegistration[];

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
