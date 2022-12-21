import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Timestamp,
  ManyToOne,
  JoinColumn
} from 'typeorm';
import { District } from './District';

@Entity()
export class Ward {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  districtId: number;

  @ManyToOne(() => District, (district) => district.wards)
  @JoinColumn({ name: 'districtId' })
  district: District;

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
