import { aggregate, find } from "../../DB/dbServices.js";
import Reaction from "../../DB/Models/Reaction.model.js";

export const attachReactionsToPosts = async ({
  posts,
  userId,
  targetType = "Post",
  topN = 3,
}) => {
  const postIds = posts.map((p) => p._id);

  const [grouped, mine] = await Promise.all([
    aggregate({
      model: Reaction,
      pipeline: [
        { $match: { targetType, targetId: { $in: postIds } } },
        {
          $group: {
            _id: { targetId: "$targetId", reaction: "$reaction" },
            count: { $sum: 1 },
          },
        },
        { $sort: { count: -1, "_id.reaction": 1 } },
      ],
    }),

    find({
      model: Reaction,
      filter: { user: userId, targetType, targetId: { $in: postIds } },
      projection: "targetId reaction",
    }),
  ]);

  const topMap = new Map();
  for (const g of grouped) {
    const key = String(g._id.targetId);
    const list = topMap.get(key) || [];
    if (list.length < topN) {
      list.push({ reaction: g._id.reaction, count: g.count });
      topMap.set(key, list);
    }
  }
  const myMap = new Map(mine.map((r) => [String(r.targetId), r.reaction]));
  return posts.map((post) => {
    const key = String(post._id);
    return {
      ...post.toObject(),
      topReactions: topMap.get(key) || [],
      myReaction: myMap.get(key) || null,
    };
  });
};
