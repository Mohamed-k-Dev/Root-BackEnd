import mongoose, { Schema } from "mongoose";
import { GENDER, ROLES } from "../../Constant/Constants.js";

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: [true, "User Name is required"],
      trim: true,
      minlength: [
        3,
        "User Name must be at least 3 characters you entered {VALUE}",
      ],
      maxlength: [
        30,
        "User Name must be at most 30 characters you entered {VALUE}",
      ],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      validate: {
        validator: function (val) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
        },
        message: (props) => `${props.value} is an invalid email`,
      },
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
      maxlength: [100, "Password must be at most 100 characters"],
    },
    gender: {
      type: String,
      required: [true, "Gender is required"],
      enum: {
        values: Object.values(GENDER),
        message: "Gender must be either 'male' or 'female'",
      },
    },
    role: {
      type: String,
      enum: Object.values(ROLES),
      default: ROLES.USER,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    bio: {
      type: String,
      default: "",
      maxlength: [500, "Bio must be at most 500 characters"],
    },
    dateOfBirth: {
      type: Date,
    },
    phoneNumber: {
      type: String,
      required: [true, "Phone Number is required"],
      // unique: true,
      trim: true,
    },
    address: {
      type: String,
      default: "",
      trim: true,
    },
    age: {
      type: Number,
      required: [true, "Age is required"],
      min: [18, "Age must be at least 18"],
      max: [100, "Age must be at most 100"],
    },
    otp : {
      type: String,
      default: "",
    },
    otpExpiration: {
      type: Date,
      default: null,
    },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const UserModel =
  mongoose.models.User || mongoose.model("User", userSchema);
