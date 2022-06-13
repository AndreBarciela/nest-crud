import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Repository } from 'typeorm';
import { Employee } from '../entities/employee.entity';

@ValidatorConstraint({ name: 'IsEmployeeExist', async: true })
@Injectable()
export class IsEmployeeExist implements ValidatorConstraintInterface {
  constructor(
    @InjectRepository(Employee, process.env.DB_NAME)
    private readonly employeeRepository: Repository<Employee>,
  ) {}

  async validate(cpf: string) {
    const employee = await this.employeeRepository.findOne({
      where: { cpf },
    });

    return employee ? true : false;
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} doesn't exist (${args.value})`;
  }
}
