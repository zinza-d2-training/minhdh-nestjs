import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Timestamp
} from 'typeorm';
import { VaccineRegistration } from './VaccineRegistration';

@Entity('groups')
export class Group {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(
    () => VaccineRegistration,
    (vaccineRegistration) => vaccineRegistration.group
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
