import { Trip } from 'src/trips/trip.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

export enum UserRole {
  CONDUCTOR = 'CONDUCTOR',
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

  @Column({ type: 'enum', enum: UserRole, default: UserRole.CONDUCTOR })
  role: UserRole;

  @Column()
  companyId: string;

  @OneToMany(() => Trip, (trip) => trip.user)
  trips: Trip[];
}
