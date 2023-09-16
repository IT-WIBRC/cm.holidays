import { Role } from "../../entities/Role";
import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { USER_ROLE } from "../../entities/types";

export class RoleService {
  private static roleManager: Repository<Role>
    = AppDataSource.getRepository(Role);

  static async findRoleByType(type: USER_ROLE): Promise<Role | null> {
    return this.roleManager.findOneBy({
      type
    });
  }

  static async findRoleById(id: string): Promise<Role | null> {
    return this.roleManager.findOneBy({
      id
    });
  }

  static async create(role: Role): Promise<Role> {
    return this.roleManager.save(role);
  }
}