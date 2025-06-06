import { Company } from 'src/companies/company.entity';
import { Trip } from 'src/trips/trip.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum UserRole {
  conductor = 'conductor',
}

export enum Status {
  Activo = 'Activo',
  Pendiente = 'Pendiente',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.conductor })
  role: UserRole;

  @Column({ type: 'enum', enum: Status, default: Status.Activo })
  status: Status;

  @ManyToOne(() => Company, (company) => company.users)
  @JoinColumn({ name: 'companyId' })
  company: Company;

  @OneToMany(() => Trip, (trip) => trip.user)
  trips: Trip[];
}
