import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('subsidiaries')
export class Subsidiary {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  tripId: string;
}
