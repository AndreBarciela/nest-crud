import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Employee } from '../../employees/entities/employee.entity';
import { Company } from '../../companies/entities/company.entity';

export function parseDatabaseConfig(): TypeOrmModuleOptions {
  return {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    name: process.env.DB_NAME,
    database: process.env.DB_NAME,

    entities: [Employee, Company],

    migrationsTableName: 'migration',
    migrations: ['dist/migrations/*.ts'],

    synchronize: true,
  };
}

export const databaseConfig = parseDatabaseConfig();
