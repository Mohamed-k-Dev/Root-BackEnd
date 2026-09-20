import { Op } from "sequelize";
import UserModel from "../../../DB/model/User.model.js";
import handleErrors from "../../../utils/handelErrors.js";

export async function addUser(req, res) {
  try {
    const { firstName, email, password } = req.body;
    const user = await UserModel.create({ firstName, email, password });
    return res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    handleErrors(error, res);
  }
}
export async function getUsers(req, res) {
  try {
    const users = await UserModel.findAll(
      {
        where: {
          fullName: { [Op.like]: "%d" },
        },
      },
      {
        attributes: {
          exclude: [
            "isAdmin",
            "password",
            "createdAt",
            "updatedAt",
            "deletedAt",
          ],
        },
      }
    );
    return res
      .status(201)
      .json({ message: "User created successfully", users });
  } catch (error) {
    handleErrors(error, res);
  }
}
export async function getUser(req, res) {
  try {
    const { email } = req.body;

    const user = await UserModel.findOne({ email });
    return user
      ? res.status(200).json({ message: "User found", user })
      : res.status(404).json({ message: "User not found" });
  } catch (error) {
    handleErrors(error, res);
  }
}
export async function getProfile(req, res) {
  try {
    const { id } = req.params;
    const user = await UserModel.findByPk(id, {
      attributes: {
        exclude: ["password", "isAdmin", "createdAt"],
      },
    });

    return user
      ? res.status(200).json({ message: "User found", user })
      : res.status(404).json({ message: "User not found" });
  } catch (error) {
    handleErrors(error, res);
  }
}
export async function updateUser(req, res) {
  try {
    const { id } = req.params;
    const { fullName, age, bio } = req.body;
    const user = await UserModel.update(
      { fullName, age, bio },
      { where: { id } },
      { new: true }
    );
    return user[0] == 0
      ? res.status(404).json({
          message: "User not found",
        })
      : res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    handleErrors(error, res);
  }
}
export async function deleteUser(req, res) {
  try {
    const { id } = req.params;
    const user = await UserModel.destroy({ where: { id } });
    return user == 0
      ? res.status(404).json({ message: "User not found" })
      : res.status(200).json({ message: "User deleted successfully", user });
  } catch (error) {
    handleErrors(error, res);
  }
}
