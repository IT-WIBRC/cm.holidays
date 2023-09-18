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

  static async create(post: Post): Promise<Post> {
    return this.postManager.save(post);
  }
}