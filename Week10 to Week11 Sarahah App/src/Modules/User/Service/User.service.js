import { UserModel } from "../../../DB/Models/User.model.js";
import { decrypt, encrypt } from "../../../Utils/encryption.utils.js";
import bcrypt from "bcrypt";
import { sendEmail } from "../../../Utils/SendEmail.utils.js";
import { randomInt } from "node:crypto";
import { messageModel } from "../../../DB/Models/Message.model.js";

export const createUser = async (req, res) => {
  const data = req.body;

  const isUserExist = await UserModel.findOne({ email: data?.email });
  if (isUserExist) {
    return res.status(409).json({ message: "User already exists" });
  }

  const newUser = new UserModel({
    ...data,
    isVerified: true,
  });
  if (data.address) {
    newUser.address = encrypt(
      newUser.address,
      process.env.ADDRESS_ENCRYPTION_KEY
    );
  }
  newUser.phoneNumber = encrypt(
    newUser.phoneNumber,
    process.env.PHONE_ENCRYPTION_KEY
  );
  newUser.password = bcrypt.hashSync(
    newUser.password,
    Number(process.env.SALT)
  );
  await newUser.save();
  res.status(201).json({
    status: "success",
    message: "User created successfully",
    user: newUser,
  });
};

export const getUser = async (req, res) => {
  const { id } = req.loggedInUser;

  const user = await UserModel.findById(id).select(
    "-password -__v -isVerified -role"
  );

  if (!user) {
    return res.status(404).json({
      status: "failed",
      message: "User not found",
    });
  }

  user.address = decrypt(user.address, process.env.ADDRESS_ENCRYPTION_KEY);
  user.phoneNumber = decrypt(
    user.phoneNumber,
    process.env.PHONE_ENCRYPTION_KEY
  );
  // const messages = await messageModel.find({ receiver: id } , { body: 1 , _id : 0  }).populate("sender" , "userName email ");
  const messages = await messageModel.find({ receiver: id }).select("body -_id").populate([
    {
      path: "sender",
      select: "userName email -_id",
    }
  ]);
  
  res.status(200).json({
    status: "success",
    message: "User fetched successfully",
    user,
    messages
  });
};

export const shareProfile = async (req, res) => {
  const { profileId } = req.params;

  const userProfile = await UserModel.findOne({
    _id: profileId,
    isDeleted: false,
  }).select("-password -__v -isVerified -role");
  if (!userProfile) {
    return res.status(404).json({
      status: "failed",
      message: "User not found",
    });
  }

  userProfile.address = decrypt(
    userProfile.address,
    process.env.ADDRESS_ENCRYPTION_KEY
  );
  userProfile.phoneNumber = decrypt(
    userProfile.phoneNumber,
    process.env.PHONE_ENCRYPTION_KEY
  );

  res.status(200).json({
    status: "success",
    message: "User profile shared successfully",
    userProfile,
  });
};

export const getAllUsers = async (req, res) => {
  const users = await UserModel.find({}, { password: 0 }).limit(5);
  if (users.length == 0) {
    return res.status(404).json({
      message: "No users found",
    });
  }
  const totalUsers = await UserModel.countDocuments();
  res.status(200).json({
    status: "success",
    message: "Users fetched successfully",
    users,
    totalUsers,
  });
};

export const updateUser = async (req, res) => {
  const data = req.body;

  const { id } = req.loggedInUser;
  const user = await UserModel.findById(id);
  if (!user) {
    return res.status(404).json({
      status: "failed",
      message: "User not found",
    });
  }

  let encryptedPhoneNumber = user.phoneNumber;
  let encryptedAddress = user.address;
  if (data.phoneNumber) {
    encryptedPhoneNumber = encrypt(
      data.phoneNumber,
      process.env.PHONE_ENCRYPTION_KEY
    );
  }
  if (data.address) {
    encryptedAddress = encrypt(
      data.address,
      process.env.ADDRESS_ENCRYPTION_KEY
    );
  }
  const updatedUser = await UserModel.findByIdAndUpdate(
    id,
    {
      ...data,
      phoneNumber: encryptedPhoneNumber,
      address: encryptedAddress,
    },
    { new: true }
  );
  res.status(200).json({
    status: "success",
    message: "User updated successfully",
    user: updatedUser,
  });
};

export const updateUserPassword = async (req, res) => {
  const data = req.body;

  const { id } = req.loggedInUser;
  const user = await UserModel.findById(id);
  if (!user) {
    return res.status(404).json({
      status: "failed",
      message: "User not found",
    });
  }

  const isPasswordMatch = bcrypt.compareSync(data.oldPassword, user.password);
  if (!isPasswordMatch) {
    return res.status(400).json({
      status: "failed",
      message: "incorrect old password",
    });
  }

  const hashedPassword = bcrypt.hashSync(
    data.password,
    Number(process.env.SALT)
  );

  const updatedUser = await UserModel.findByIdAndUpdate(
    id,
    {
      password: hashedPassword,
    },
    { new: true }
  );
  res.status(200).json({
    status: "success",
    message: "User updated successfully",
    user: updatedUser,
  });
};

export const freezeAccount = async (req, res) => {
  const { id } = req.loggedInUser;
  await UserModel.findByIdAndUpdate(
    id,
    {
      isDeleted: true,
    },
    { new: true }
  );
  res.status(200).json({
    status: "success",
    message: "User account deleted successfully",
  });
};

export const verifyFreezeAccount = async (req, res) => {
  const { email } = req.body;

  const otp = randomInt(100000, 1000000).toString();
  const otpExpiration = new Date(Date.now() + 5 * 60 * 1000);
  const encryptedOtp = encrypt(otp, process.env.OTP_ENCRYPTION_KEY);

  const user = await UserModel.findOneAndUpdate(
    { email },
    {
      otp: encryptedOtp,
      otpExpiration,
    },
    { new: true }
  );

  if (!user) {
    return res.status(404).json({
      status: "failed",
      message: "User not found",
    });
  }

  sendEmail({
    to: email,
    subject: "Account Freeze Verification",
    html: `<h1>Your OTP is ${otp}</h1>`,
  });

  res.status(200).json({
    status: "success",
    message: `OTP has been sent to your ${email}`,
  });
};

export const restoreAccount = async (req, res) => {
  const { email, otp } = req.body;

  const user = await UserModel.findOne({ email });
  if (!user) {
    return res.status(404).json({
      status: "failed",
      message: "User not found",
    });
  }

  if (user.isDeleted === false) {
    return res.status(400).json({
      status: "failed",
      message: "Your account is already active",
    });
  }

  const decryptedOtp = decrypt(user.otp, process.env.OTP_ENCRYPTION_KEY);
  if (decryptedOtp !== otp) {
    return res.status(400).json({
      status: "failed",
      message: "Invalid OTP",
    });
  }

  user.isDeleted = false;
  user.otp = "";
  user.otpExpiration = null;
  await user.save();

  res.status(200).json({
    status: "success",
    message: `Account restored successfully please login again`,
  });
};

export const deleteAllUsers = async (req, res) => {
  const deletedUsers = await UserModel.deleteMany({});
  res.status(200).json({
    status: "success",
    message: "All users deleted successfully",
    deletedUsers,
  });
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  const deletedUser = await UserModel.findByIdAndDelete(id);
  if (!deletedUser) {
    return res.status(404).json({
      status: "failed",
      message: "User not found",
    });
  }
  res.status(200).json({
    status: "success",
    message: "User deleted successfully",
    deletedUser,
  });
};
