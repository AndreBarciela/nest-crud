import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Repository } from 'typeorm';
import { Company } from '../entities/company.entity';

@ValidatorConstraint({ name: 'UniqueConstraintCompany', async: true })
@Injectable()
export class UniqueConstraintCompany implements ValidatorConstraintInterface {
  constructor(
    @InjectRepository(Company, process.env.DB_NAME)
    private readonly companyRepository: Repository<Company>,
  ) {}

  async validate(cnpj: string) {
    const company = await this.companyRepository.findOne({
      where: { cnpj: cnpj },
    });

    return !company;
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} (${args.value}) already exist!`;
  }
}
