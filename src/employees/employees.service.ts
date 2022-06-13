import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  DeleteResult,
  FindManyOptions,
  ILike,
  Repository,
  UpdateResult,
} from 'typeorm';
import { Company } from '../companies/entities/company.entity';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { EmployeeCompanyDto } from './dto/employee-company.dto';
import { FindEmployeeDto } from './dto/find-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee } from './entities/employee.entity';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee, process.env.DB_NAME)
    private readonly employeeRepository: Repository<Employee>,
    @InjectRepository(Company, process.env.DB_NAME)
    private readonly companyRepository: Repository<Company>,
  ) {}

  async create(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    const companies = await this.findCompanies(createEmployeeDto.companies);

    const employee = new Employee();
    employee.name = createEmployeeDto.name;
    employee.cpf = createEmployeeDto.cpf;
    employee.address = createEmployeeDto.address;
    employee.email = createEmployeeDto.email;
    employee.companies = companies;

    return await this.employeeRepository.save(employee);
  }

  async findCompanies(
    employeeCompanyDto: EmployeeCompanyDto[],
  ): Promise<Company[]> {
    if (employeeCompanyDto.length === 0) return null;

    return await this.companyRepository.findBy(employeeCompanyDto);
  }

  async findAll(findEmployeeDto: FindEmployeeDto): Promise<Employee[]> {
    const condition: FindManyOptions = {
      relations: ['companies'],
      skip: findEmployeeDto.offset,
      take: findEmployeeDto.limit,
    };

    if (findEmployeeDto.cpf) {
      condition.where = {
        cpf: ILike(`%${findEmployeeDto.cpf}%`),
      };
    }

    return await this.employeeRepository.find(condition);
  }

  async findOne(id: number): Promise<Employee> {
    const employee = await this.employeeRepository.findOne({
      where: { id },
      relations: ['companies'],
    });

    if (!employee) {
      throw new NotFoundException();
    }

    return employee;
  }

  async update(
    id: number,
    updateEmployeeDto: UpdateEmployeeDto,
  ): Promise<UpdateResult> {
    return await this.employeeRepository.update({ id }, updateEmployeeDto);
  }

  async remove(id: number): Promise<DeleteResult> {
    return await this.employeeRepository.delete(id);
  }
}
