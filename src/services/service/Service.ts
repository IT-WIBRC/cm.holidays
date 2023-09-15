import { Repository } from "typeorm";
import { Service } from "../../entities/Service";
import { AppDataSource } from "../../data-source";
import { ServiceDTO } from "../../entities/types";
export class CompanyService {
  private  static serviceManager: Repository<Service>
    = AppDataSource.getRepository(Service);

  static async findServiceByName(name: string): Promise<Service | null> {
    return this.serviceManager.findOneBy({
      name
    });
  }

  static async findServiceById(id: string): Promise<Service | null> {
    return this.serviceManager.findOneBy({
      id
    });
  }

  static async create(service: ServiceDTO): Promise<Service | null> {
    return this.serviceManager.save(service);
  }
}