import { IsString, Validate } from 'class-validator';
import { IsCompanyExist } from '../../companies/validators/company-exist';

export class EmployeeCompanyDto {
  @IsString()
  @Validate(IsCompanyExist)
  cnpj: string;
}
