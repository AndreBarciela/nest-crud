import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Employee } from '../employees/entities/employee.entity';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { FindCompanyDto } from './dto/find-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Company } from './entities/company.entity';

describe('CompaniesService', () => {
  let service: CompaniesService;
  let employeeRepository: Repository<Employee>;
  let companyRepository: Repository<Company>;

  const employeeRepositoryMock = () => ({
    findBy: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
  });

  const companyRepositoryMock = () => ({
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
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
        CompaniesService,
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

    service = module.get<CompaniesService>(CompaniesService);
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

  it('create should be return companyRepository.save', async () => {
    jest.spyOn(employeeRepository, 'findBy').mockResolvedValue([]);
    jest.spyOn(employeeRepository, 'save').mockResolvedValue(employeeExpected);
    jest.spyOn(companyRepository, 'save').mockResolvedValue(companyExpected);

    const createCompanyDto = {
      employees: [
        {
          cpf: '11122233396',
        },
      ],
    } as CreateCompanyDto;

    expect(await service.create(createCompanyDto)).toEqual(companyExpected);
  });

  it('findAll should be return array employees', async () => {
    jest.spyOn(companyRepository, 'find').mockResolvedValue([companyExpected]);

    const findCompanyDto = {
      cnpj: 64524976000146,
      limit: 10,
      offset: 0,
    } as FindCompanyDto;

    expect(await service.findAll(findCompanyDto)).toEqual([companyExpected]);
  });

  it('findOne should be return exception when employee not found', async () => {
    jest.spyOn(companyRepository, 'findOne').mockResolvedValue(null);

    await expect(service.findOne(1)).rejects.toEqual(
      new NotFoundException(`Company not found`),
    );
  });

  it('findOne should be return the employee', async () => {
    jest.spyOn(companyRepository, 'findOne').mockResolvedValue(companyExpected);

    expect(await service.findOne(1)).toEqual(companyExpected);
  });

  it('update should be return the employee', async () => {
    jest.spyOn(companyRepository, 'findOne').mockResolvedValue(companyExpected);
    jest.spyOn(companyRepository, 'update').mockResolvedValue(null);
    jest
      .spyOn(employeeRepository, 'findOne')
      .mockResolvedValue(employeeExpected);
    jest.spyOn(employeeRepository, 'save').mockResolvedValue(null);

    const updateCompanyDto = {
      name: 'André Barciela',
      address: 'Rua Uruguaiana - Rio de Janeiro',
      employees: [
        {
          cpf: '64524976000146',
        },
      ],
    } as UpdateCompanyDto;

    expect(await service.update(1, updateCompanyDto)).toEqual(companyExpected);
  });

  it('remove should be return the delete result', async () => {
    const deleteExpected = {
      raw: [],
      affected: 1,
    } as DeleteResult;

    jest.spyOn(companyRepository, 'delete').mockResolvedValue(deleteExpected);

    expect(await service.remove(1)).toEqual(deleteExpected);
  });
});
