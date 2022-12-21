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
import { Province } from './Province';

@Entity()
export class District {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  provinceId: number;

  @ManyToOne(() => Province, (province) => province.districts)
  @JoinColumn({ name: 'provinceId' })
  province: Province;

  @OneToMany(() => Ward, (ward) => ward.district)
  wards: Ward[];

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
