import { Employee } from '../../employees/entities/employee.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Company {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ length: 14, unique: true })
  cnpj: string;

  @Column()
  address: string;

  @ManyToMany(() => Employee, (employee) => employee.companies, {
    cascade: ['insert', 'update'],
    onDelete: 'CASCADE',
  })
  employees: Employee[];
}
