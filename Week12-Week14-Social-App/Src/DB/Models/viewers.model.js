import mongoose from "mongoose";

export const viewerSchema = new mongoose.Schema({
  viewer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  viewed: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  viewedAt: {
    type: Date,
    default: Date.now,
  },
  isRead: {
    type: Boolean,
    default: false,
  },
});

const Viewers =
  mongoose.models.Viewers || mongoose.model("Viewers", viewerSchema);

export default Viewers;
