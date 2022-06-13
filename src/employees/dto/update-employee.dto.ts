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
import { IsValidCnpj } from '../../companies/validators/cnpj';
import { IsCompanyExist } from '../../companies/validators/company-exist';

export class UpdateEmployeeDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  address: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CompanyCpf)
  companies: CompanyCpf[];
}

export class CompanyCpf {
  @IsNumberString()
  @IsNotEmpty()
  @Validate(IsValidCnpj)
  @Validate(IsCompanyExist)
  cnpj: string;
}
