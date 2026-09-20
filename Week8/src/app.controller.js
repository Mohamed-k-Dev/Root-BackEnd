import express from "express";
import connectToDatabase from "./DB/connection.js";
import userRouter from "./module/user/user.controller.js";
import authRouter from "./module/auth/auth.controller.js";
import blogsRouter from "./module/user copy/user.controller.js";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use("/user", userRouter);
app.use("/auth", authRouter);
app.use("/blogs", blogsRouter);

export default async function bootstrap() {
  connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

  app.on("error", (err) => {
    if (err.code === "EADDRINUSE") {
      console.error(
        `Port ${PORT} is already in use. Please choose another port.`
      );
    } else {
      console.error("An error occurred while starting the server:", err);
    }
  });
}
