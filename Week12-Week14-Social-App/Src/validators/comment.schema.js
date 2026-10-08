import Joi from "joi";
import { commentCommonFields, paginationCommonFields } from "../Utils/validation/commonFields.utils.js";

export const createCommentSchema = {
  params: Joi.object({
    targetId: commentCommonFields.targetId,
  }),
  body: Joi.object({
    content: commentCommonFields.content,
    targetType: commentCommonFields.targetType,
    parentComment: commentCommonFields.parentComment,
  }),
};

export const getCommentsSchema = {
  params: Joi.object({
    postId: commentCommonFields.targetId,
  }),
  query: Joi.object({
    page: paginationCommonFields.page,
    limit: paginationCommonFields.limit,
    sort: paginationCommonFields.sort,
  }),
};

export const getCommentsRepliesSchema = {
  params: Joi.object({
    commentId: commentCommonFields.targetId,
  }),
  query: Joi.object({
    page: paginationCommonFields.page,
    limit: paginationCommonFields.limit,
    sort: paginationCommonFields.sort,
  }),
};

export const deleteCommentSchema = {
  params: Joi.object({
    commentId: commentCommonFields.targetId,
  }),
};
