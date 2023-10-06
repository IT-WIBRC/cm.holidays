import { AppDataSource } from "../data-source";
import { Employee } from "../entities/Employee";
import { Repository } from "typeorm";

export class PersonService {
  private static personManager: Repository<Employee> =
    AppDataSource.getRepository(Employee);

  static async findByEmail(email: string): Promise<Employee | null> {
    return this.personManager.findOne({
      where: {
        email: email.toLowerCase()
      },
      relations: {
        roles: true
      },
      loadEagerRelations: true
    });
  }

  static async findByLastName(lastName: string): Promise<Employee | null> {
    return this.personManager
      .createQueryBuilder("t_employee")
      .where("LOWER(t_employee.lastName) = LOWER(:lastName)", { lastName })
      .getOne();
  }

  static async findUserById(userId: string): Promise<Employee | null> {
    return this.personManager.findOne({
      where: {
        id: userId
      },
      relations: {
        holidays: true
      }
    });
  }

  static async create(person: Employee): Promise<Employee | null> {
    return this.personManager.save(person);
  }
}