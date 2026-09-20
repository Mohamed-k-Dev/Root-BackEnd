import { sequelize } from "../connection.js";
import UserModel from "./User.model.js";

const BlogModel = sequelize.define("Blog", {
  title: {
    type: "string",
    allowNull: false,
  },
  content: {
    type: "string",
    allowNull: false,
  },
});

BlogModel.belongsTo(UserModel, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  foreignKey: {
    allowNull: false,
  },
});

export default BlogModel;
