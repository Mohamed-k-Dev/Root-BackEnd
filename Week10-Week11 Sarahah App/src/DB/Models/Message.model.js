import mongoose from "mongoose";

const messageSchema = mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    body: {
      type: String,
      required: [true, "Message content is required"],
      trim: true,
      maxlength: [1000, "Message content must be at most 1000 characters"],
      minLength: [1, "Message content must be at least 1 character long"],
    },
  },
  {
    timestamps: true,
  }
);

export const messageModel =
  mongoose.models.Message || mongoose.model("Message", messageSchema);

// {
//     sender: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//     receiver: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//     content: {
//       type: String,
//       required: [true, "Message content is required"],
//       trim: true,
//       maxlength: [1000, "Message content must be at most 1000 characters"],
//     },
//     timestamp: {
//       type: Date,
//       default: Date.now,
//     },
//   },
