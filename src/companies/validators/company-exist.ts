import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Repository } from 'typeorm';
import { Company } from '../entities/company.entity';

@ValidatorConstraint({ name: 'IsCompanyExist', async: true })
@Injectable()
export class IsCompanyExist implements ValidatorConstraintInterface {
  constructor(
    @InjectRepository(Company, process.env.DB_NAME)
    private readonly companyRepository: Repository<Company>,
  ) {}

  async validate(cnpj: string) {
    const company = await this.companyRepository.findOne({
      where: { cnpj: cnpj },
    });

    return company ? true : false;
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} doesn't exist (${args.value})`;
  }
}
