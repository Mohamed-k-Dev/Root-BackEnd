const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");

const PORT = 3000;
const filePath = path.resolve("users.json");
let users = JSON.parse(fs.readFileSync(filePath, "utf-8")) || [];

const server = http.createServer((req, res) => {
  const { url, method } = req;

  if (url === "/" && method === "GET") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.write("server is running");
    res.end();
  } else if (url == "/users" && method === "GET") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(users));
  } else if (url == "/signup" && method === "POST") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", () => {
      const { name, email, password } = JSON.parse(body);
      const newUser = { id: users.length + 1, name, email, password };
      users = [...users, newUser];
      fs.writeFileSync(filePath, JSON.stringify(users));
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({ message: "User created successfully", user: newUser })
      );
    });
  } else if (url == "/user" && method == "POST") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", () => {
      const { email } = JSON.parse(body);
      const user = users.find((user) => user.email == email);
      if (user) {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(user));
      } else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "User not found" }));
      }
    });
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.write(JSON.stringify({ message: "Not Found" }));
    res.end();
  }
});

server.listen(PORT, (err) => {
  console.log("Server is running on port " + PORT);
});

server.on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    console.error(
      `port : ${PORT} already in use, please change the port number`
    );
  } else {
    console.error(err);
  }
});
