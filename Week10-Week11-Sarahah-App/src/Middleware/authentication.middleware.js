import jwt from "jsonwebtoken";
import { UserModel } from "../DB/Models/User.model.js";

export const authentication = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      return res
        .status(400)
        .json({ message: "authorization token is required" });
    }

    
    const [role, userToken] = authorization.split(" ");
    if (!role || !userToken) {
      return res
      .status(400)
      .json({ message: "Invalid authorization token format" });
    }

    let signature = null;
    if (role === "Bearer") {
      signature = process.env.JWT_SECRET_KEY;
    } else {
      signature = process.env.JWT_ADMIN_SECRET_KEY;
    }

    const { id } = jwt.verify(userToken, signature);
    if (!id) {
      return res
        .status(400)
        .json({ message: "Invalid authorization token payload" });
    }

    const user = await UserModel.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.loggedInUser = user;
    next();
  } catch (error) {
    if (
      error?.name === "JsonWebTokenError" ||
      error?.name === "TokenExpiredError"
    ) {
      return res
        .status(401)
        .json({ error: "Invalid authorization token", message: error.message });
    }
    res.status(500).json({
      message: "Internal Server Error",
      error: error,
      stack: error.stack,
    });
  }
};

export const authorization = (roles) => {
  return async (req, res, next) => {
    if (!roles.includes(req.loggedInUser.role)) {
      return res.status(403).json({ message: "Unauthorized access" });
    }
    next();
  };
};
