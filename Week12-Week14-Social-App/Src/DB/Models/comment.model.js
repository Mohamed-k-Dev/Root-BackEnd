import mongoose from "mongoose";
import { COMMENT_TARGET_TYPES } from "../../Constants/Constants.js";

export const commentSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Comment author is required"],
    },
    content: {
      type: String,
      trim: true,
      minlength: [1, "Comment content must be at least 1 character long"],
      maxlength: [1000, "Comment content must be at most 1000 characters"],
      required: [true, "Comment content is required"],
    },
    targetType: {
      type: String,
      enum: Object.values(COMMENT_TARGET_TYPES),
      required: [true, "Comment target type is required"],
    },
    targetId: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: "targetType",
      required: [true, "Comment target ID is required"],
    },
    post: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true },
    ancestors: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    repliesCount: { type: Number, default: 0 },
    commentReactionsCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

commentSchema.index({
  targetType: 1,
  targetId: 1,
  createdAt: -1,
});
commentSchema.index({ post: 1, targetType: 1, createdAt: -1 });    
commentSchema.index({ ancestors: 1 });

const Comment =
  mongoose.models.Comment || mongoose.model("Comment", commentSchema);
export default Comment;
