import { Company } from 'src/companies/company.entity';
import { User } from 'src/users/user.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('reports')
export class Report {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'date', nullable: true })
  dateFrom?: string;

  @Column({ type: 'date', nullable: true })
  dateTo?: string;

  @Column({ nullable: true })
  driver?: string;  // nombre u ID

  @Column({ nullable: true })
  destination?: string;

  @Column({ nullable: true })
  status?: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, { nullable: true })
  createdBy?: User;

  @ManyToOne(() => Company, { nullable: true })
  company?: Company;
}
