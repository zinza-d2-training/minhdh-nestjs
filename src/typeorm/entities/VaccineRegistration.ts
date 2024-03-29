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

  @Column({ nullable: true })
  numBHYT: string;

  @Column({ nullable: true })
  job: string;

  @Column({ nullable: true })
  work_unit: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  date_injection: Date;

  @Column({ nullable: true })
  session_injection: string;

  @Column()
  registration_code: string;

  @Column({ nullable: true })
  vaccine_code: string;

  @Column()
  status: number;

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
