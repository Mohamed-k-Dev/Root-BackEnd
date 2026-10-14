import { parseTags } from "../Utils/normalizePostPayload/parseTags.js";
import { errorResponse } from "../Utils/response/ApiResponse.js";

export const preparePayload = (req, res, next) => {
  const { content, tags } = req.body || {};

  const hasContent = typeof content === "string" && content.trim() !== "";
  const hasTags = Array.isArray(tags)
    ? tags.length > 0
    : typeof tags === "string" && tags.trim() !== "";
  const hasImages = req.files?.images?.length > 0;
  const hasImage = req.file;

  if (!hasContent && !hasTags && !hasImages && !hasImage) {
    return errorResponse({
      res,
      message: "Validation error",
      status: 400,
      error: [
        {
          message: "At least one of content, tags, or image must be provided",
        },
      ],
    });
  }
  if (hasTags) req.body.tags = parseTags(tags);

  next();
};
