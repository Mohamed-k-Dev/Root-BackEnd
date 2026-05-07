import express from "express";
import userRouter from "./modules/user/user.controller.js";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use("/user", userRouter);

export default function bootstrap() {
  app.get("/", (req, res) => {
    res.send("Hello World es6");
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

  app.on("error", (err) => {
    if (err.code === "EADDRINUSE") {
      console.error(
        `Port ${PORT} is already in use. Please choose another port.`
      );
    } else {
      console.error("Server error:", err);
    }
  });
}
