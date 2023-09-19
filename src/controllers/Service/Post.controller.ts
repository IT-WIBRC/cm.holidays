import { NextFunction, Request, Response } from "express";
import { asyncWrapper } from "../requestHanlder";
import { PostService } from "../../services/Post.service";
import { ApiError } from "../../middlewares/errors/Api";
import { StatusCodes } from "http-status-codes";
import { CompanyService } from "../../services/service/Service";
import { Post } from "../../entities/Post";
import { regulariseSpacesFrom } from "../../utils/commons";
import { ServiceDTO } from "../../entities/types";

export class PostController {
  static async create(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<string> {
    return await asyncWrapper(async () => {
      const {
        name,
        description,
        service: { id }
      } = request.body;
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

  static async getPostByServiceId(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<string> {
    return await asyncWrapper(async () => {
      const { id } = request.params;
      if (!id) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "Service id is missing");
      }

      const service = await CompanyService.findServiceById(id);

      if (!service) {
        throw new ApiError(StatusCodes.NOT_FOUND, "Service not found");
      }

      const { isAdmin, isHumanResource  } = response.locals.roles;
      const posts = await PostService
        .findPostByServiceId(
          service.id,
          isAdmin || !isHumanResource
        );

      return response.status(StatusCodes.OK).send(posts);
    })(request, response, next);
  }

  static async activePost(request: Request,
    response: Response,
    next: NextFunction): Promise<Response<ServiceDTO>> {
    return await asyncWrapper(async () => {

      if (!request.params.id) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "No id found");
      }

      const post = await PostService.findById(request.params.id);
      if (!post) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "Post not found");
      }

      if (post.isActive) {
        throw new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, "Post is already active");
      }

      post.isActive = true;
      await PostService.activate(post);

      return response.sendStatus(StatusCodes.NO_CONTENT);
    })(request, response, next);
  }
}