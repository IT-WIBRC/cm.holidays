import { AppDataSource } from "../../data-source";
import { Employee } from "../../entities/Employee";
import { Repository } from "typeorm";
import { Post } from "../../entities/Post";

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

  static async create(person: Employee): Promise<Employee | null> {
    return this.personManager.save(person);
  }
}