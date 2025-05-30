import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column()
  source: string;

  @Column()
  destination: string;

  @Column({ type: 'enum', enum: Status })
  status: Status;

  @Column()
  userId: string;
}
