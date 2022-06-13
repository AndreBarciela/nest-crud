import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DeleteResult } from 'typeorm';
import { Employee } from '../employees/entities/employee.entity';
import { CompaniesController } from './companies.controller';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { FindCompanyDto } from './dto/find-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Company } from './entities/company.entity';

describe('CompaniesController', () => {
  let controller: CompaniesController;
  let service: CompaniesService;

  const companiesServiceMock = () => ({
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  });

  const companyExpected = {
    address: 'Rua Uruguaiana - Rio de Janeiro',
    name: 'HOME',
    cnpj: '64524976000146',
    employees: [],
  } as Company;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompaniesController],
      providers: [
        {
          provide: CompaniesService,
          useFactory: companiesServiceMock,
        },
        {
          provide: getRepositoryToken(Employee, process.env.DB_NAME),
          useValue: {},
        },
        {
          provide: getRepositoryToken(Company, process.env.DB_NAME),
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<CompaniesController>(CompaniesController);
    service = module.get<CompaniesService>(CompaniesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('create should be return employee', async () => {
    jest.spyOn(service, 'create').mockResolvedValue(companyExpected);

    expect(await controller.create(new CreateCompanyDto())).toEqual(
      companyExpected,
    );
  });

  it('findAll should be return array employee', async () => {
    jest.spyOn(service, 'findAll').mockResolvedValue([companyExpected]);

    expect(await controller.findAll(new FindCompanyDto())).toEqual([
      companyExpected,
    ]);
  });

  it('findOne should be return employee', async () => {
    jest.spyOn(service, 'findOne').mockResolvedValue(companyExpected);

    expect(await controller.findOne('1')).toEqual(companyExpected);
  });

  it('update should be return employee', async () => {
    jest.spyOn(service, 'update').mockResolvedValue(companyExpected);

    expect(await controller.update('1', new UpdateCompanyDto())).toEqual(
      companyExpected,
    );
  });

  it('remove should be return employee', async () => {
    const deleteExpected = {
      raw: [],
      affected: 1,
    } as DeleteResult;

    jest.spyOn(service, 'remove').mockResolvedValue(deleteExpected);

    expect(await controller.remove('1')).toEqual(deleteExpected);
  });
});
