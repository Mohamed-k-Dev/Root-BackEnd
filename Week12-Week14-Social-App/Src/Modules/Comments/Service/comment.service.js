import { SYSTEM_RULES } from "../../../Constants/Constants.js";
import {
  create,
  deleteMany,
  find,
  findById,
  findOne,
  paginate,
  updateCounter,
} from "../../../DB/dbServices.js";
import Comment from "../../../DB/Models/comment.model.js";
import Post from "../../../DB/Models/Post.model.js";
import {
  errorResponse,
  sendSuccessResponse,
} from "../../../Utils/response/ApiResponse.js";

const targetModels = { Post, Comment };

export const CreateComment = async (req, res) => {
  const author = req.authUser;
  const { content, targetType } = req.body;
  const { targetId } = req.params;

  const target = await findOne({
    model: targetModels[targetType],
    filter: { _id: targetId },
  });
  if (!target || target.isDeleted) {
    return errorResponse({
      res,
      message: `No ${targetType} found with this id`,
      status: 404,
    });
  }

  const isReply = targetType === "Comment";
  const postId = isReply ? target.post : target._id;
  const ancestors = isReply ? [...(target.ancestors || []), target._id] : [];

  const comment = await create({
    model: Comment,
    data: {
      author,
      content,
      targetType,
      targetId,
      post: postId,
      ancestors,
    },
  });

  await Promise.all([
    updateCounter({ model: Post, id: postId, field: "commentsCount" }),
    isReply &&
      updateCounter({ model: Comment, id: targetId, field: "repliesCount" }),
  ]);

  sendSuccessResponse({
    res,
    message: "Comment created successfully",
    status: 201,
    data: comment,
  });
};

export const getPostComments = async (req, res) => {
  const { postId } = req.params;
  const { page, limit, sort } = req.query;

  const comments = await paginate({
    model: Comment,
    filter: { post: postId, targetType: "Post" },
    projection: "-__v -updatedAt -deletedAt -ancestors -targetType ",
    populate: [{ path: "author", select: "userName email profileImage" }],
    page,
    limit,
    sort: sort === "asc" ? { createdAt: 1 } : { createdAt: -1 },
  });
  if (!comments?.data || comments.data.length === 0) {
    return sendSuccessResponse({
      res,
      message: `No comments found for this post`,
    });
  }

  sendSuccessResponse({
    res,
    message: "Comments fetched successfully",
    data: comments,
  });
};

export const getCommentsReplies = async (req, res) => {
  const { commentId } = req.params;
  const { page, limit = 50, sort = "asc" } = req.query;

  const comments = await paginate({
    model: Comment,
    filter: { targetId: commentId, targetType: "Comment" },
    projection: "-__v -updatedAt -deletedAt -ancestors -targetType ",
    populate: [{ path: "author", select: "userName email profileImage" }],
    page,
    limit,
    sort: sort === "asc" ? { createdAt: 1 } : { createdAt: -1 },
  });
  if (!comments?.data || comments.data.length === 0) {
    return sendSuccessResponse({
      res,
      message: `No replies found for this comment`,
    });
  }

  sendSuccessResponse({
    res,
    message: "Replies fetched successfully",
    data: comments,
  });
};

export const deleteComment = async (req, res) => {
  const { commentId } = req.params;
  const author = req.authUser._id;

  const comment = await findById({ model: Comment, id: commentId });
  if (!comment) {
    return errorResponse({
      res,
      message: `No comment belong to you found with this id`,
      status: 404,
    });
  }

  const post = await findById({ model: Post, id: comment.post });

  const isAdmin = req.authUser.role === SYSTEM_RULES.ADMIN;
  const isAuthor = comment.author?.toString() === author?.toString();
  const isPostAuthor = post?.author.toString() === author?.toString();
  if (!isAdmin && !isAuthor && !isPostAuthor) {
    return errorResponse({
      res,
      message: "You are not authorized to delete this comment",
      status: 403,
    });
  }

  const descendants = await find({
    model: Comment,
    filter: { ancestors: comment._id },
    projection: "_id",
  });
  const ids = [comment._id, ...descendants.map((d) => d._id)];

  await deleteMany({ model: Comment, filter: { _id: { $in: ids } } });

  const directParentId =
    comment.targetType === "Comment" ? comment.targetId : null;

  await Promise.all([
    post &&
      updateCounter({
        model: Post,
        id: comment.post,
        field: "commentsCount",
        amount: -ids.length,
      }),
    directParentId &&
      updateCounter({
        model: Comment,
        id: directParentId,
        field: "repliesCount",
        amount: -1,
      }),
  ]);

  sendSuccessResponse({
    res,
    message: "Comment deleted successfully",
  });
};
