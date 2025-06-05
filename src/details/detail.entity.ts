import { Trip } from 'src/trips/trip.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('details')
export class Detail {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  duration: string; // ejemplo: "25 minutos"

  @Column({ type: 'int' })
  numberAlerts: number;

  @Column({ type: 'int' })
  numberResponses: number;

  @Column({ type: 'float' })
  effectiveness: number;

  @ManyToOne(() => Trip, { onDelete: 'CASCADE' })
  trip: Trip;

  @Column()
  tripId: string;

  // Si estás almacenando registros crudos desde sensores o frontend (opcional):
  @Column({ type: 'jsonb', nullable: true })
  dataCollected?: any;
}
