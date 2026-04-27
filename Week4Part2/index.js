const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");

const PORT = 3000;
const filePath = path.resolve("index.html");
const usersFilePath = path.resolve("users.json");
let users = [{ id: 1, name: "John Doe" }];

const server = http.createServer((req, res) => {
  const { url, method } = req;

  if (url === "/" && method === "GET") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.write(JSON.stringify(users));
    res.end();
  } else if (url == "/file" && method === "GET") {
    const readFile = fs.createReadStream(filePath, {
      encoding: "utf-8",
      highWaterMark: 50,
    });
    readFile.on("data", (chunk) => {
      res.write(chunk);
      res.write("<hr/>");
    });
    // readFile.pipe(res);
  } else if (url == "/users" && method === "GET") {
    res.writeHead(200, { "Content-Type": "application/json" });
    const readFile = fs.createReadStream(usersFilePath, {
      encoding: "utf-8",
      highWaterMark: 10,
    });
    // readFile.on("data", (chunk) => {
    //   res.write(chunk);
    // });
    readFile.pipe(res);
  } else if (url == "/signup" && method === "POST") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", () => {
      const { name, email, password } = JSON.parse(body);
      const newUser = { id: users.length + 1, name, email, password };
      users = [...users, newUser];
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({ message: "User created succeassfully", user: newUser })
      );
    });
  } else if (url == "/all" && method === "GET") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ users, count: users.length, page: 1, limit: 10 }));
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
    console.error("Address in use, please change the port number");
  } else {
    console.error(err);
  }
});
