import { City } from 'src/cities/city.entity';
import { User } from 'src/users/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

export enum Status {
  IN_PROGRESS = 'IN_PROGRESS',
  FINISHED = 'FINISHED',
}

@Entity('trips')
export class Trip {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  startDate: string;

  @Column()
  endDate: string;

  @ManyToOne(() => City)
  @JoinColumn({ name: 'originId' })
  origin: City;

  @ManyToOne(() => City)
  @JoinColumn({ name: 'destinationId' })
  destination: City;

  @Column()
  originId: string;

  @Column()
  destinationId: string;

  @Column({ type: 'enum', enum: Status })
  status: Status;

  @ManyToOne(() => User, (user) => user.trips)
  user: User;

  @Column()
  companyId: string;
}
