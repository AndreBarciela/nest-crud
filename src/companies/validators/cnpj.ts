import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { CompaniesService } from '../companies.service';
import { clearValue } from 'validation-br/dist/utils';
import { isCNPJ } from 'validation-br';

@ValidatorConstraint({ name: 'IsValidCnpj', async: true })
@Injectable()
export class IsValidCnpj implements ValidatorConstraintInterface {
  constructor(protected readonly companiesService: CompaniesService) {}

  async validate(cnpj: string) {
    const cnpjUnmask = clearValue(cnpj);

    if (cnpjUnmask.length !== 14) return false;

    return isCNPJ(cnpj);
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} (${args.value}) is invalid`;
  }
}
