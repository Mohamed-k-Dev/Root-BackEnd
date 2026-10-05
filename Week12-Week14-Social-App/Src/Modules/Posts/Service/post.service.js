import { SYSTEM_RULES } from "../../../Constants/Constants.js";
import {
  create,
  find,
  findById,
  findOneAndDelete,
  findOneAndUpdate,
  paginate,
} from "../../../DB/dbServices.js";
import Post from "../../../DB/Models/Post.model.js";
import User from "../../../DB/Models/User.model.js";
import uploadImage, {
  deleteUploadedImage,
} from "../../../Service/cloudinary.service.js";
import {
  errorResponse,
  sendSuccessResponse,
} from "../../../Utils/response/ApiResponse.js";

export const getAllPosts = async (req, res) => {
  const { page, limit, status, sort } = req.query;
  const filter =
    status === "deleted"
      ? { isDeleted: true }
      : status === "active"
      ? { isDeleted: false, isDeleted: null }
      : {};
  const sortOption = sort === "asc" ? { createdAt: 1 } : { createdAt: -1 };

  const post = await paginate({
    model: Post,
    filter: { ...filter },
    projection: "-author -__v -createdAt -updatedAt -deletedAt",
    populate: {
      path: "author",
      select: "userName email profileImage",
    },
    page,
    limit,
    sort: sortOption,
  });
  sendSuccessResponse({
    res,
    message: "Post fetched successfully",
    data: { post },
  });
};

export const userPost = async (req, res) => {
  const post = await findById({
    model: Post,
    id: req.params.postId,
    projection: "-author -__v -createdAt -updatedAt -deletedAt",
    populate: {
      path: "author",
      select: "userName email profileImage",
    },
  });
  sendSuccessResponse({
    res,
    message: "Post fetched successfully",
    data: { post },
  });
};

export const userPosts = async (req, res) => {
  const author = req.authUser._id;
  const { page, limit } = req.query;
  const [user, posts] = await Promise.all([
    findById({
      model: User,
      id: author,
      projection:
        "-password -role -isVerified -isBlocked -isDeleted -otp -otpExpiration -forgetOtp -forgetOtpExpiration -provider -updatedAt -__v",
    }),
    paginate({
      model: Post,
      filter: { author, deletedAt: null },
      projection: "-__v -updatedAt -deletedAt",
      page,
      limit,
      sort: { createdAt: -1 },
    }),
  ]);

  sendSuccessResponse({
    res,
    message: "Post created successfully",
    data: { user, posts },
  });
};

export const createPost = async (req, res) => {
  const author = req.authUser._id;
  const { content, tags } = req.body;
  const { images } = req.files;

  let postImages = [];
  if (images && images.length > 0) {
    for (const image of images) {
      const uploadedImage = await uploadImage({
        filePath: image?.path,
        options: {
          folder: process.env.CLOUDINARY_POST_FOLDER,
        },
      });
      postImages.push({
        url: uploadedImage.secure_url,
        public_id: uploadedImage.public_id,
      });
    }
  }

  const post = await create({
    model: Post,
    data: {
      author,
      content,
      images: postImages,
      tags: tags,
    },
  });

  sendSuccessResponse({
    res,
    message: "Post created successfully",
    data: { post },
  });
};

export const updatePost = async (req, res) => {
  const author = req.authUser._id;
  const postId = req.params.postId;
  const { content, tags } = req.body;
  const { images } = req.files;

  let postImages = [];
  const oldPost = await findById({
    model: Post,
    id: postId,
    projection: "images author",
  });

  if (oldPost?.author.toString() !== author.toString()) {
    return errorResponse({
      res,
      message: "You are not authorized to update this post",
      status: 403,
    });
  }

  if (images && images.length > 0) {
    for (const image of oldPost?.images) {
      deleteUploadedImage(image.public_id);
    }
    for (const image of images) {
      const uploadedImage = await uploadImage({
        filePath: image?.path,
        options: {
          folder: process.env.CLOUDINARY_POST_FOLDER,
        },
      });
      postImages.push({
        url: uploadedImage.secure_url,
        public_id: uploadedImage.public_id,
      });
    }
  }

  const post = await findOneAndUpdate({
    model: Post,
    filter: { _id: postId, author, deletedAt: null },
    data: {
      content,
      images: postImages,
      tags: tags,
    },
  });

  sendSuccessResponse({
    res,
    message: "Post created successfully",
    data: { post },
  });
};

export const softDeletePost = async (req, res) => {
  const author = req.authUser._id;
  const postId = req.params.postId;

  const owner = req.authUser?.role === SYSTEM_RULES.ADMIN ? {} : { author };

  const post = await findOneAndUpdate({
    model: Post,
    filter: { _id: postId, ...owner },
    data: { isDeleted: true, deletedAt: new Date(), images: [] },
    options: { new: false },
  });

  if (!post) {
    return errorResponse({
      res,
      message: "No post founded belongs to you with this id",
      status: 404,
    });
  }

  if (post?.isDeleted) {
    return errorResponse({
      res,
      message: "This post is already deleted",
      status: 400,
    });
  }

  if (post?.images && post?.images.length > 0) {
    for (const image of post?.images) {
      deleteUploadedImage(image.public_id);
    }
  }

  sendSuccessResponse({
    res,
    message: "Post deleted successfully",
  });
};

export const deletePost = async (req, res) => {
  const postId = req.params.postId;

  const post = await findOneAndDelete({
    model: Post,
    filter: { _id: postId },
    data: { isDeleted: true, deletedAt: new Date(), images: [] },
    options: { new: false },
  });

  if (!post) {
    return errorResponse({
      res,
      message: "No post founded belongs to you with this id",
      status: 404,
    });
  }

  if (post?.images && post?.images.length > 0) {
    for (const image of post?.images) {
      deleteUploadedImage(image.public_id);
    }
  }

  sendSuccessResponse({
    res,
    message: "Post hard deleted successfully",
  });
};

export const restorePost = async (req, res) => {
  const author = req.authUser._id;
  const postId = req.params.postId;

  const post = await findOneAndUpdate({
    model: Post,
    filter: { _id: postId, author, isDeleted: true },
    data: { isDeleted: false, deletedAt: null },
    options: { new: false },
  });

  if (!post) {
    return errorResponse({
      res,
      message: "No deleted post founded belongs to you with this id",
      status: 404,
    });
  }

  if (!post?.isDeleted) {
    return errorResponse({
      res,
      message: "This post is not deleted",
      status: 400,
    });
  }

  sendSuccessResponse({
    res,
    message: "Post restored successfully",
  });
};
