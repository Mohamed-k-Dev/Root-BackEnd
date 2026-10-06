import {
  create,
  deleteOne,
  findOne,
  findOneAndUpdate,
} from "../../../DB/dbServices.js";
import Post from "../../../DB/Models/Post.model.js";
import Reaction from "../../../DB/Models/Reaction.model.js";
import { sendSuccessResponse } from "../../../Utils/response/ApiResponse.js";

const targetModels = {
  Post: Post,
};

export const react = async (req, res) => {
  const user = req.authUser._id;
  const targetId = req.params.targetId;
  const { targetType, reaction } = req.body;

  const filter = {
    user,
    targetType,
    targetId,
  };

  const existingReaction = await findOne({
    model: Reaction,
    filter,
  });

  if (!existingReaction) {
    await create({
      model: Reaction,
      data: {
        user,
        targetType,
        targetId,
        reaction,
      },
    });
    await findOneAndUpdate({
      model: targetModels[targetType],
      filter: { _id: targetId },
      data: { $inc: { likesCount: 1 } },
    });
    return sendSuccessResponse({ res, message: "User reacted successfully" });
  }

  if (existingReaction?.reaction === reaction) {
    await deleteOne({
      model: Reaction,
      filter: { _id: existingReaction._id },
    });
    await findOneAndUpdate({
      model: targetModels[targetType],
      filter: { _id: targetId },
      data: { $inc: { likesCount: -1 } },
    });
    return sendSuccessResponse({
      res,
      message: "User deleted reaction successfully",
    });
  }

  await findOneAndUpdate({
    model: Reaction,
    filter: { _id: existingReaction._id },
    data: { reaction },
  });

  sendSuccessResponse({
    res,
    message: "user updated reaction successfully",
  });
};
