import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, ILike, Repository } from 'typeorm';
import { Employee } from '../employees/entities/employee.entity';
import { CreateCompanyDto } from './dto/create-company.dto';
import { FindCompanyDto } from './dto/find-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Company } from './entities/company.entity';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Company, process.env.DB_NAME)
    private readonly companyRepository: Repository<Company>,
    @InjectRepository(Employee, process.env.DB_NAME)
    private readonly employeeRepository: Repository<Employee>,
  ) {}

  async create(createCompanyDto: CreateCompanyDto) {
    const company = new Company();
    company.name = createCompanyDto.name;
    company.cnpj = createCompanyDto.cnpj;
    company.address = createCompanyDto.address;
    company.employees = await this.findOrSaveEmployees(
      createCompanyDto.employees,
    );

    return await this.companyRepository.save(company);
  }

  async findOrSaveEmployees(employees): Promise<Employee[]> {
    if (!employees) return [];

    const cpfEmployees = employees.map((company) => {
      return { cpf: company.cpf };
    });
    const employeesReturned = await this.employeeRepository.findBy(
      cpfEmployees,
    );

    if (employeesReturned.length < employees.length) {
      const results = employees.filter(
        ({ cpf: id1 }) =>
          !employeesReturned.some(({ cpf: id2 }) => id2 === id1),
      );

      await this.employeeRepository.save(results);
    }

    return await this.employeeRepository.findBy(cpfEmployees);
  }

  async findAll(findCompanyDto: FindCompanyDto) {
    const condition: FindManyOptions = {
      relations: ['employees'],
      skip: findCompanyDto.offset,
      take: findCompanyDto.limit,
    };

    if (findCompanyDto.cnpj) {
      condition.where = {
        cnpj: ILike(`%${findCompanyDto.cnpj}%`),
      };
    }

    return await this.companyRepository.find(condition);
  }

  async findOne(id: number) {
    const company = await this.companyRepository.findOne({
      where: { id },
      relations: ['employees'],
    });

    if (!company) {
      throw new NotFoundException(`Company not found`);
    }

    return company;
  }

  async update(id: number, updateCompanyDto: UpdateCompanyDto) {
    const company = await this.findOne(id);

    updateCompanyDto.employees.map(async (employee) => {
      const employeeUpdated = await this.employeeRepository.findOne({
        where: { cpf: employee.cpf },
        relations: ['companies'],
      });
      employeeUpdated.companies = [...employeeUpdated.companies, company];

      return await this.employeeRepository.save(employeeUpdated);
    });

    if (updateCompanyDto.name || updateCompanyDto.address) {
      const companyUpdated = new Company();
      companyUpdated.name = updateCompanyDto.name;
      companyUpdated.address = updateCompanyDto.address;

      await this.companyRepository.update({ id }, companyUpdated);
    }

    return await this.findOne(id);
  }

  async remove(id: number) {
    return await this.companyRepository.delete(id);
  }
}
