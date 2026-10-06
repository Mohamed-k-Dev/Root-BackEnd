import mongoose from "mongoose";

export const PostModel = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Post author is required"],
    },
    content: {
      type: String,
      trim: true,
      minlength: [1, "Post content must be at least 1 character long"],
      maxlength: [5000, "Post content must be at most 5000 characters"],
      required: [
        function () {
          return (
            (!this.images || this.images.length === 0) &&
            (!this.tags || this.tags.length === 0)
          );
        },
        "Post content is required if there are no images or tags",
      ],
    },
    images: [
      {
        url: String,
        public_id: String,
      },
    ],
    videos: [
      {
        url: String,
        public_id: String,
      },
    ],

    tags: [{ type: String, trim: true }],
    likesCount: { type: Number, default: 0 },
    commentsCount: { type: Number, default: 0 },

    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

PostModel.virtual("reactions", {
  ref: "Reaction",
  localField: "_id",
  foreignField: "targetId",
});

PostModel.set("toJSON", { virtuals: true });
PostModel.set("toObject", { virtuals: true });

const Post = mongoose.models.Post || mongoose.model("Post", PostModel);
export default Post;
