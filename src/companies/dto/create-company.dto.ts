import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
  Validate,
  ValidateNested,
} from 'class-validator';
import { IsValidCnpj } from '../validators/cnpj';
import { UniqueConstraintCompany } from '../validators/unique-constraint-company.validator';
import { CompanyEmployeeDto } from './company-employee.dto';

export class CreateCompanyDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumberString()
  @IsNotEmpty()
  @Validate(IsValidCnpj)
  @Validate(UniqueConstraintCompany)
  cnpj: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CompanyEmployeeDto)
  employees: CompanyEmployeeDto[];
}
