import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { CompaniesService } from '../../companies/companies.service';
import { clearValue } from 'validation-br/dist/utils';
import { isCPF } from 'validation-br';

@ValidatorConstraint({ name: 'IsValidCpf', async: true })
@Injectable()
export class IsValidCpf implements ValidatorConstraintInterface {
  constructor(protected readonly companiesService: CompaniesService) {}

  async validate(cpf: string) {
    const cpfUnmask = clearValue(cpf);

    if (cpfUnmask.length !== 11) return false;

    return isCPF(cpf);
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} (${args.value}) is invalid`;
  }
}
