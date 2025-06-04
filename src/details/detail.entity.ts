import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('details')
export class Detail {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  duration: string;

  @Column()
  numberAlerts: string;

  @Column()
  numberResponses: string;

  @Column()
  effectiveness: string;
  description: any;
  location: any;
  speed: any;
  timestamp: any;
}
