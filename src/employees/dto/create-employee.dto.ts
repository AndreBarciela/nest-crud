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
import { IsValidCpf } from '../validators/cpf.validator';
import { UniqueConstraintEmployee } from '../validators/unique-constraint-employee.validator';
import { EmployeeCompanyDto } from './employee-company.dto';

export class CreateEmployeeDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumberString()
  @IsNotEmpty()
  @Validate(IsValidCpf)
  @Validate(UniqueConstraintEmployee)
  cpf: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EmployeeCompanyDto)
  companies: EmployeeCompanyDto[];
}
