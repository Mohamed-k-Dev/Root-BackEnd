import express from "express";
import database_connection from "./DB/connection.js";
import authRouter from "./Modules/Auth/Auth.controller.js";
import { userRouter } from "./Modules/User/User.controller.js";
import * as dotenv from "dotenv";
import path from "node:path";
import { messageRouter } from "./Modules/Message/Message.controller.js";

dotenv.config({ path: path.resolve("../code/src/Config/.env.dev") });
const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/messages", messageRouter);
// app.use((err, req, res, next) => {
//   res.status(500).json({ error: "Internal Server Error "  , message : err.message , line : err.stack});
// });

const bootstrapFunction = () => {
  database_connection();
  app
    .listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    })
    .on("error", (err) => {
      console.log(`something went wrong on connecting on server ${err}`);
    });
};

export default bootstrapFunction;
