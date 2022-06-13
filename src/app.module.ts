import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { databaseConfig } from './config/database/database.config';
import { EmployeesModule } from './employees/employees.module';
import { CompaniesModule } from './companies/companies.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    EmployeesModule,
    CompaniesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
