import { Repository } from "typeorm";
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
    return this.postManager.find({
      select: ["id", "description", "name", "isActive"],
      where: {
        isActive: isAdmin ? undefined : !isAdmin,
        service: {
          id
        }
      }
    });
  }

  static async create(post: Post): Promise<Post> {
    return this.postManager.save(post);
  }
}