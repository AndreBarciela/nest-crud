import { Module } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { EmployeesController } from './employees.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { Company } from '../companies/entities/company.entity';
import { CompaniesService } from '../companies/companies.service';
import { IsCompanyExist } from '../companies/validators/company-exist';
import { UniqueConstraintEmployee } from './validators/unique-constraint-employee.validator';
import { IsValidCpf } from './validators/cpf.validator';

@Module({
  imports: [TypeOrmModule.forFeature([Employee, Company], process.env.DB_NAME)],
  controllers: [EmployeesController],
  providers: [
    EmployeesService,
    CompaniesService,
    IsCompanyExist,
    UniqueConstraintEmployee,
    IsValidCpf,
  ],
})
export class EmployeesModule {}
