import { Trip } from 'src/trips/trip.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('details')
export class Detail {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'integer' })
  triggerSecond: number;

  @Column()
  message: string;

  @Column({ default: false })
  responded: boolean;

  @ManyToOne(() => Trip, (trip) => trip.details, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'tripId' })
  trip: Trip;

  @Column()
  tripId: string;
}
