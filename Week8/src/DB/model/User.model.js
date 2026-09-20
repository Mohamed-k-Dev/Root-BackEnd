import { DataTypes } from "sequelize";
import { sequelize } from "../connection.js";

const UserModel = sequelize.define(
  "User",
  {
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 50],
      },
    },
    userName: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        len: [3, 50],
      },
      set(val) {
        this.setDataValue("userName", val.toLowerCase() + "@devPulser");
      },
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        // is: /^[a-zA-Z0-9]{8,}$/,
      },
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isIn: [["male", "female"]],
      },
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    bio: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue:
        "https://images.pexels.com/photos/8566467/pexels-photo-8566467.jpeg",
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    timestamps: true,
    paranoid: true,
  }
);

export default UserModel;
