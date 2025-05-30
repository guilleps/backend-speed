import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('reports')
export class Report {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  dateGeneration: string;

  @Column()
  travelStartDate: string;

  @Column()
  travelEndDate: string;

  @Column()
  source: string;

  @Column()
  destination: string;

  @Column()
  duration: string;

  @Column()
  totalAlerts: number;

  @Column()
  alertsAttended: number;

  @Column()
  userId: string;
}
