import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Timestamp,
  ManyToOne,
  JoinColumn,
  OneToMany
} from 'typeorm';
import { District } from './District';
import { User } from './User';
import { VaccinationSites } from './VaccinationSites';

@Entity('wards')
export class Ward {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  district_id: number;

  @ManyToOne(() => District, (district) => district.wards)
  @JoinColumn({ name: 'district_id' })
  district: District;

  @OneToMany(() => User, (user) => user.ward)
  users: User[];

  @OneToMany(
    () => VaccinationSites,
    (vaccinationSites) => vaccinationSites.ward
  )
  vaccinationSites: VaccinationSites[];

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
