export const SYSTEM_RULES = {
  USER: "user",
  ADMIN: "admin",
};

export const SYSTEM_PROVIDERS = {
  SYSTEM: "system",
  GOOGLE: "google",
};

export const REACTION_TYPES = {
  LIKE: "like",
  DISLIKE: "dislike",
  LOVE: "love",
  ANGRY: "angry",
  SAD: "sad",
  WOW: "wow",
  HAHA: "haha",
};

export const REACTION_TARGET_TYPES = {
  POST: "Post",
  COMMENT: "Comment",
  REPLY: "Reply",
  STORY: "Story",
  MESSAGE: "Message",
};

export const COMMENT_TARGET_TYPES = {
  POST: "Post",
  COMMENT: "Comment",
};

export const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/jpg"];
export const MAX_IMAGE_SIZE = 2 * 1024 * 1024; // 2MB
