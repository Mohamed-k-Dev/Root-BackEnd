const path = require("path");
const fs = require("fs");
const express = require("express");

const app = express();
const PORT = 3000;
const filePath = path.resolve("./users.json");
const textPath = path.resolve("./text.txt");
const htmlPath = path.resolve("./index.html");

app.use(express.json());

app.get("/", (req, res) => {
  return res.send("Hello World");
});

app.get("/file", (req, res) => {
  return res.sendFile(filePath);
});

app.get("/stream", (req, res) => {
  const readFileStream = fs.createReadStream(textPath, {
    encoding: "utf-8",
    highWaterMark: 50,
  });
  readFileStream.pipe(res);
});

app.get("/html", (req, res) => {
  const readFileStream = fs.createReadStream(htmlPath, {
    encoding: "utf-8",
    highWaterMark: 50,
  });
  readFileStream.pipe(res);
});

app.post("/signup", (req, res) => {
   res.json({ message: "User created successfully" });
});

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

server.on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    console.error(
      `Port ${PORT} is already in use. Please choose another port.`
    );
  } else {
    console.error("Server error:", err);
  }
});

