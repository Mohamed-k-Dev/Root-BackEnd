import { messageModel } from "../../../DB/Models/Message.model.js";

export const sendMessage = async (req, res) => {
  const { receiverId, body } = req.body;
  await messageModel.create({
    sender: req.loggedInUser.id,
    receiver: receiverId,
    body,
  });

  res.status(201).json({
    status: "success",
    message: "Message sent successfully",
  });
};
