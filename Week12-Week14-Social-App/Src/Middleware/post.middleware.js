import { parseTags } from "../Utils/normalizePostPayload/parseTags.js";
import { errorResponse } from "../Utils/response/ApiResponse.js";

export const preparePostPayload = (req, res, next) => {
  const { content, tags } = req.body || {};

  const hasContent = typeof content === "string" && content.trim() !== "";
  const hasTags = Array.isArray(tags)
    ? tags.length > 0
    : typeof tags === "string" && tags.trim() !== "";
  const hasImages = req.files?.images?.length > 0;

  if (!hasContent && !hasTags && !hasImages) {
    return errorResponse({
      res,
      message: "Validation error",
      error: [
        {
          message: "At least one of content, tags, or images must be provided",
        },
      ],
    });
  }

  if (hasTags) req.body.tags = parseTags(tags);

  next();
};
