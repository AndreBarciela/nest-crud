import {
  IsNotEmpty,
  IsNumberString,
  IsString,
  Validate,
} from 'class-validator';
import { IsValidCpf } from '../../employees/validators/cpf.validator';

export class CompanyEmployeeDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumberString()
  @IsNotEmpty()
  @Validate(IsValidCpf)
  cpf: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  address: string;
}
