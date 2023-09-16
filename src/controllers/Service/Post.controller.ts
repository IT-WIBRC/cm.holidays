import { NextFunction, Request, Response } from "express";
import { asyncWrapper } from "../requestHanlder";
import { PostService } from "../../services/Post.service";
import { ApiError } from "../../middlewares/errors/Api";
import { StatusCodes } from "http-status-codes";
import { CompanyService } from "../../services/service/Service";
import { Post } from "../../entities/Post";
import { regulariseSpacesFrom } from "../../utils/commons";

export class PostController {
  static async create(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<string> {
    return await asyncWrapper(async () => {
      const { name, description, service: { id } } = request.body;
      const existingPost = await PostService
        .findByName(regulariseSpacesFrom(name));

      if (existingPost) {
        throw new ApiError(StatusCodes.CONFLICT, "Post already exist");
      }

      const serviceOfPost = await CompanyService.findServiceById(id);

      if (!serviceOfPost) {
        throw new ApiError(StatusCodes.CONFLICT, "Service does not exist");
      }

      let newPost = new Post();
      newPost.name = regulariseSpacesFrom(name);
      newPost.service = serviceOfPost;
      newPost.isActive = false;
      if (description.trim())
        newPost.description = regulariseSpacesFrom(description);

      newPost = await PostService.create(newPost);

      response.status(StatusCodes.CREATED).send({
        id: newPost.id
      });

    })(request, response, next);
  }
}