import { FindManyOptions, Repository } from "typeorm";
import { Post } from "../entities/Post";
import { AppDataSource } from "../data-source";

export class PostService {
  private static postManager: Repository<Post>
    = AppDataSource.getRepository(Post);

  static async findByName(name: string): Promise<Post | null> {
    return this.postManager
      .createQueryBuilder("t_post")
      .where("LOWER(t_post.name) = LOWER(:name)", { name })
      .getOne();
  }

  static async findPostByServiceId(
    id: string,
    isAdmin = false
  ): Promise<Post[]> {
    const searchBody: FindManyOptions<Post> = isAdmin
      ? {
        select: ["id", "description", "name", "isActive"],
        where: {
          service: {
            id
          }
        }
      }
      : {
        select: ["id", "description", "name"],
        where: {
          isActive: !isAdmin,
          service: {
            id
          }
        }
      };
    return this.postManager.find(searchBody);
  }

  static async create(post: Post): Promise<Post> {
    return this.postManager.save(post);
  }
}