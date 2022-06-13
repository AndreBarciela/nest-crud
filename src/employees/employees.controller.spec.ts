import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DeleteResult } from 'typeorm';
import { Company } from '../companies/entities/company.entity';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { FindEmployeeDto } from './dto/find-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { EmployeesController } from './employees.controller';
import { EmployeesService } from './employees.service';
import { Employee } from './entities/employee.entity';

describe('EmployeesController', () => {
  let controller: EmployeesController;
  let service: EmployeesService;

  const employeesServiceMock = () => ({
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  });

  const employeeExpected = {
    address: 'Rua Flamarion - Rio de Janeiro',
    name: 'André Barciela',
    email: 'andrebarciela@teste.com',
    cpf: '11122233396',
    companies: [],
  } as Employee;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeesController],
      providers: [
        {
          provide: EmployeesService,
          useFactory: employeesServiceMock,
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

    controller = module.get<EmployeesController>(EmployeesController);
    service = module.get<EmployeesService>(EmployeesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('create should be return employee', async () => {
    jest.spyOn(service, 'create').mockResolvedValue(employeeExpected);

    expect(await controller.create(new CreateEmployeeDto())).toEqual(
      employeeExpected,
    );
  });

  it('findAll should be return array employee', async () => {
    jest.spyOn(service, 'findAll').mockResolvedValue([employeeExpected]);

    expect(await controller.findAll(new FindEmployeeDto())).toEqual([
      employeeExpected,
    ]);
  });

  it('findOne should be return employee', async () => {
    jest.spyOn(service, 'findOne').mockResolvedValue(employeeExpected);

    expect(await controller.findOne('1')).toEqual(employeeExpected);
  });

  it('update should be return employee', async () => {
    jest.spyOn(service, 'update').mockResolvedValue(employeeExpected);

    expect(await controller.update('1', new UpdateEmployeeDto())).toEqual(
      employeeExpected,
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
