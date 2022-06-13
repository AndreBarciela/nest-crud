import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Repository } from 'typeorm';
import { Employee } from '../../employees/entities/employee.entity';

@ValidatorConstraint({ name: 'UniqueConstraintEmployee', async: true })
@Injectable()
export class UniqueConstraintEmployee implements ValidatorConstraintInterface {
  constructor(
    @InjectRepository(Employee, process.env.DB_NAME)
    private readonly employeeRepository: Repository<Employee>,
  ) {}

  async validate(cpf: string) {
    const employee = await this.employeeRepository.findOne({
      where: { cpf },
    });

    return !employee;
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} (${args.value}) already exist!`;
  }
}
