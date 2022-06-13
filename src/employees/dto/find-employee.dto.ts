import { PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';

export class FindEmployeeDto extends PartialType(PaginationQueryDto) {
  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  cpf: number = null;
}
