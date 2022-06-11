import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
