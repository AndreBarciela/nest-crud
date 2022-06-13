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
import { IsValidCpf } from '../../employees/validators/cpf.validator';
import { IsEmployeeExist } from '../../employees/validators/employee-exist.validator';

export class UpdateCompanyDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  address: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EmployeeCpf)
  employees: EmployeeCpf[];
}

export class EmployeeCpf {
  @IsNumberString()
  @IsNotEmpty()
  @Validate(IsValidCpf)
  @Validate(IsEmployeeExist)
  cpf: string;
}
