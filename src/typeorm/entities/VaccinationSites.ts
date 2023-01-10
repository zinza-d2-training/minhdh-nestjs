import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Timestamp
} from 'typeorm';
import { Ward } from './Ward';

@Entity('vaccination_sites')
export class VaccinationSites {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  leader: string;

  @Column()
  number_table: number;

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

  @Column()
  ward_id: number;

  @ManyToOne(() => Ward, (ward) => ward.vaccinationSites)
  @JoinColumn({ name: 'ward_id' })
  ward: Ward;
}
