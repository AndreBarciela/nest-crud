import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Company } from '../../companies/entities/company.entity';

@Entity()
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ length: 11, unique: true })
  cpf: string;

  @Column()
  email: string;

  @Column()
  address: string;

  @ManyToMany(() => Company, (company) => company.employees, {
    cascade: ['insert', 'update'],
    onDelete: 'CASCADE',
  })
  @JoinTable()
  companies: Company[];
}
