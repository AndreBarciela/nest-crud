import { Module } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CompaniesController } from './companies.controller';
import { Company } from './entities/company.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IsValidCnpj } from './validators/cnpj';
import { UniqueConstraintCompany } from './validators/unique-constraint-company.validator';
import { Employee } from '../employees/entities/employee.entity';
import { IsEmployeeExist } from '../employees/validators/employee-exist.validator';

@Module({
  imports: [TypeOrmModule.forFeature([Company, Employee], process.env.DB_NAME)],
  controllers: [CompaniesController],
  providers: [
    CompaniesService,
    IsValidCnpj,
    UniqueConstraintCompany,
    IsEmployeeExist,
  ],
})
export class CompaniesModule {}
