import mongoose from "mongoose";
import {
  REACTION_TARGET_TYPES,
  REACTION_TYPES,
} from "../../Constants/Constants.js";

const ReactionModel = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Reaction user is required"],
    },
    targetType: {
      type: String,
      enum: Object.values(REACTION_TARGET_TYPES),
      default: REACTION_TARGET_TYPES.POST,
      required: [true, "Reaction target type is required"],
    },
    targetId: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: "targetType",
      required: [true, "Reaction target id is required"],
    },
    reaction: {
      type: String,
      enum: Object.values(REACTION_TYPES),
      default: REACTION_TYPES.LIKE,
      required: [true, "Reaction type is required"],
    },
  },
  { timestamps: true }
);

ReactionModel.index({ user: 1, targetType: 1, targetId: 1 }, { unique: true });
ReactionModel.index({ targetType: 1, targetId: 1 });

const Reaction =
  mongoose.models.Reaction || mongoose.model("Reaction", ReactionModel);
export default Reaction;
