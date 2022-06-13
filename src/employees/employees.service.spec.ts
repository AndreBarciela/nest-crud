import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DeleteResult, getRepository, Repository } from 'typeorm';
import { Company } from '../companies/entities/company.entity';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { EmployeeCompanyDto } from './dto/employee-company.dto';
import { FindEmployeeDto } from './dto/find-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { EmployeesService } from './employees.service';
import { Employee } from './entities/employee.entity';

describe('EmployeesService', () => {
  let service: EmployeesService;
  let employeeRepository: Repository<Employee>;
  let companyRepository: Repository<Company>;

  const employeeRepositoryMock = () => ({
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  });

  const companyRepositoryMock = () => ({
    findBy: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
  });

  const employeeExpected = {
    address: 'Rua Flamarion - Rio de Janeiro',
    name: 'André Barciela',
    email: 'andrebarciela@teste.com',
    cpf: '11122233396',
    companies: [],
  } as Employee;

  const companyExpected = {
    address: 'Rua Uruguaiana - Rio de Janeiro',
    name: 'HOME',
    cnpj: '64524976000146',
    employees: [],
  } as Company;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmployeesService,
        {
          provide: getRepositoryToken(Employee, process.env.DB_NAME),
          useFactory: employeeRepositoryMock,
        },
        {
          provide: getRepositoryToken(Company, process.env.DB_NAME),
          useFactory: companyRepositoryMock,
        },
      ],
    }).compile();

    service = module.get<EmployeesService>(EmployeesService);
    employeeRepository = module.get(
      getRepositoryToken(Employee, process.env.DB_NAME),
    );
    companyRepository = module.get(
      getRepositoryToken(Company, process.env.DB_NAME),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create should be return employeeRepository.save', async () => {
    jest.spyOn(companyRepository, 'findBy').mockResolvedValue(null);
    jest.spyOn(employeeRepository, 'save').mockResolvedValue(employeeExpected);

    expect(await service.create(new CreateEmployeeDto())).toEqual(
      employeeExpected,
    );
  });

  it('findCompanies should be return null when not have companies', async () => {
    jest
      .spyOn(companyRepository, 'findBy')
      .mockResolvedValue([companyExpected]);

    expect(await service.findCompanies([])).toEqual(null);
  });

  it('findCompanies should be return array companies', async () => {
    jest
      .spyOn(companyRepository, 'findBy')
      .mockResolvedValue([companyExpected]);

    expect(await service.findCompanies([new Company()])).toEqual([
      companyExpected,
    ]);
  });

  it('findAll should be return array employees', async () => {
    jest
      .spyOn(employeeRepository, 'find')
      .mockResolvedValue([employeeExpected]);

    const findEmployeeDto = {
      cpf: 11122233396,
      limit: 10,
      offset: 0,
    } as FindEmployeeDto;

    expect(await service.findAll(findEmployeeDto)).toEqual([employeeExpected]);
  });

  it('findOne should be return exception when employee not found', async () => {
    jest.spyOn(employeeRepository, 'findOne').mockResolvedValue(null);

    await expect(service.findOne(1)).rejects.toEqual(
      new NotFoundException(`Employee not found`),
    );
  });

  it('findOne should be return the employee', async () => {
    jest
      .spyOn(employeeRepository, 'findOne')
      .mockResolvedValue(employeeExpected);

    expect(await service.findOne(1)).toEqual(employeeExpected);
  });

  it('update should be return the employee', async () => {
    jest
      .spyOn(employeeRepository, 'findOne')
      .mockResolvedValue(employeeExpected);
    jest.spyOn(employeeRepository, 'update').mockResolvedValue(null);
    jest.spyOn(companyRepository, 'findOne').mockResolvedValue(companyExpected);
    jest.spyOn(companyRepository, 'save').mockResolvedValue(null);

    const updateEmployeeDto = {
      name: 'André Barciela',
      address: 'Rua Flamarion - Rio de Janeiro',
      email: 'andrebarciela@teste.com',
      companies: [
        {
          cnpj: '64524976000146',
        },
      ],
    } as UpdateEmployeeDto;

    expect(await service.update(1, updateEmployeeDto)).toEqual(
      employeeExpected,
    );
  });

  it('remove should be return the delete result', async () => {
    const deleteExpected = {
      raw: [],
      affected: 1,
    } as DeleteResult;

    jest.spyOn(employeeRepository, 'delete').mockResolvedValue(deleteExpected);

    expect(await service.remove(1)).toEqual(deleteExpected);
  });
});
