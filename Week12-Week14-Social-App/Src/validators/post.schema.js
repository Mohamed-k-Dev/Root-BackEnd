import Joi from "joi";
import {
  paginationCommonFields,
  PostCommonFields,
} from "../Utils/validation/commonFields.utils.js";

export const getPostsSchema = {
  query: Joi.object({
    page: paginationCommonFields.page,
    limit: paginationCommonFields.limit,
    status: PostCommonFields.status,
    sort: paginationCommonFields.sort,
  }),
};
export const getPostSchema = {
  params: Joi.object({
    postId: PostCommonFields.postId.required(),
  }),
};

export const createPostSchema = {
  body: Joi.object({
    content: PostCommonFields.content,
    tags: PostCommonFields.tags,
  }),
  files: Joi.object({
    images: PostCommonFields.images,
  }),
};

export const updatePostSchema = {
  params: Joi.object({
    postId: PostCommonFields.postId.required(),
  }),
  body: Joi.object({
    content: PostCommonFields.content,
    tags: PostCommonFields.tags,
  }),
  files: Joi.object({
    images: PostCommonFields.images,
  }),
};

export const deletePostSchema = {
  params: Joi.object({
    postId: PostCommonFields.postId.required(),
  }),
};

export const restorePostSchema = {
  params: Joi.object({
    postId: PostCommonFields.postId.required(),
  }),
};
