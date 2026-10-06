import Joi from "joi";
import { ReactionCommonFields } from "../Utils/validation/commonFields.utils.js";

export const ReactSchema = {
  body: Joi.object({
    targetType: ReactionCommonFields.targetType,
    reaction: ReactionCommonFields.reaction,
  }),
  params: Joi.object({
    targetId: ReactionCommonFields.targetId,
  }),
};
