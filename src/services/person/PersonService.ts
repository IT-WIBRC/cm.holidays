import { AppDataSource } from "../../data-source";
import { Employee } from "../../entities/Employee";
import { Repository } from "typeorm";

export class PersonService {
  private static personManager: Repository<Employee> = AppDataSource.getRepository(Employee);

  static async findByEmail(email: string): Promise<Employee | null> {
    return this.personManager.findOneBy({
      email
    });
  }
}