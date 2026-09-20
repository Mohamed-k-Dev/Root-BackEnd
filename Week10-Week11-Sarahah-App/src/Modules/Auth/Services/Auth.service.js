import { UserModel } from "../../../DB/Models/User.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendEmail } from "../../../Utils/SendEmail.utils.js";
import { emailTemplate } from "../../../../verifyEmailTemplate.js";
import path from "path";
import { encrypt } from "../../../Utils/encryption.utils.js";

export const signUp = async (req, res) => {
  const data = req.body;

  const isUserExist = await UserModel.findOne({ email: data?.email });
  if (isUserExist) {
    return res.status(409).json({ message: "User already exists" });
  }

  const hashedPassword = bcrypt.hashSync(
    data.password,
    Number(process.env.SALT)
  );
  const encryptedPhone = encrypt(
    data.phoneNumber,
    process.env.PHONE_ENCRYPTION_KEY
  );
  const encryptedAddress = encrypt(
    data.address,
    process.env.ADDRESS_ENCRYPTION_KEY
  );

  const emailToken = jwt.sign(
    { email: data.email },
    process.env.JWT_EMAIL_SECRET_KEY,
    {
      expiresIn: "1d",
    }
  );
  const verifyEmail = `${req.protocol}://${req.headers.host}/auth/verify-email?${emailToken}`;
  sendEmail({
    to: data.email,
    subject: `Hello ${data.userName} form sarhah app ✔`,
    html: emailTemplate(verifyEmail),
    attachments: [
      {
        filename: "bg.png",
        path: path.resolve("Assets/جميع الاوامر المستخدمه في الفيديو.txt"),
      },
    ],
  });

  const user = await UserModel.create({
    ...data,
    password: hashedPassword,
    phoneNumber: encryptedPhone,
    address: encryptedAddress,
  });

  res.status(201).json({ message: "User created successfully", user });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const isPasswordMatch = bcrypt.compareSync(password, user.password);
  if (!isPasswordMatch) {
    return res.status(404).json({ message: "User not found" });
  }

  if (user.isDeleted) {
    return res.status(404).json({ message: "User account has been deleted" });
  }

  const isUserVerified = user.isVerified;
  if (!isUserVerified) {
    return res.status(404).json({ message: "please verify your email first" });
  }

  const token = jwt.sign(
    { id: user._id, email },
    user.role === "admin"
      ? process.env.JWT_ADMIN_SECRET_KEY
      : process.env.JWT_SECRET_KEY,
    { expiresIn: "1d" }
  );

  res.status(200).json({
    status: "success",
    message: "User logged in successfully",
    token,
  });
};

export const verifyEmail = async (req, res) => {
  const { authorization } = req.headers;
  const { email } = jwt.verify(authorization, process.env.JWT_EMAIL_SECRET_KEY);

  const user = await UserModel.findOneAndUpdate(
    { email },
    { isVerified: true },
    { new: true }
  );
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json({
    status: "success",
    message: "User verified successfully",
    user,
  });
};

// const {
//   userName,
//   email,
//   password,
//   confirmPassword,
//   gender,
//   bio,
//   address,
//   role,
//   phoneNumber,
// } = req.body;
