import { Op } from "sequelize";
import UserModel from "../../../DB/model/User.model.js";
import handleErrors from "../../../utils/handelErrors.js";

export async function signup(req, res) {
  try {
    const { fullName, email, password, userName, gender, age, bio, image } =
      req.body;

    const isExist = await UserModel.findOne({
      where: {
        [Op.or]: [{ email }, { userName }],
      },
    });
    if (isExist) {
      return res
        .status(409)
        .json({ message: "Email or username already exists" });
    }

    const newUser = UserModel.build({
      fullName,
      email,
      password,
      userName,
      gender,
      age,
      bio,
      image,
    });
    newUser.gender = gender.toLowerCase();
    await newUser.save();
    return res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    handleErrors(error, res);
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ where: { email, password } });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    return res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    handleErrors(error, res);
  }
}
