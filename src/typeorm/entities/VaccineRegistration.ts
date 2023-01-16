import { VaccinationSites } from './VaccinationSites';
import { Group } from './Group';
import { Vaccine } from './Vaccine';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Timestamp
} from 'typeorm';
import { User } from './User';

@Entity('vaccine_registrations')
export class VaccineRegistration {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  numBHYT: number;

  @Column()
  job: string;

  @Column()
  work_unit: string;

  @Column()
  address: string;

  @Column()
  date_injection: Date;

  @Column()
  session_injection: string;

  @Column()
  user_id: number;

  @Column()
  group_id: number;

  @Column({ nullable: true })
  vaccine_id: number;

  @Column({ nullable: true })
  vaccination_site_id: number;

  @ManyToOne(() => User, (user) => user.vaccineRegistrations)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Vaccine, (vaccine) => vaccine.vaccineRegistrations)
  @JoinColumn({ name: 'vaccine_id' })
  vaccine: Vaccine;

  @ManyToOne(() => Group, (group) => group.vaccineRegistrations)
  @JoinColumn({ name: 'group_id' })
  group: Group;

  @ManyToOne(
    () => VaccinationSites,
    (vaccinationSite) => vaccinationSite.vaccineRegistrations
  )
  @JoinColumn({ name: 'vaccination_site_id' })
  vaccinationSite: VaccinationSites;

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
