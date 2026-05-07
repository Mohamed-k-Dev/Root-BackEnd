const express = require("express");
const mysql2 = require("mysql2");

const app = express();
const PORT = 3000;

app.use(express.json());

const databaseConnection = mysql2.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "blogweek7",
});
databaseConnection.connect((err) => {
  if (err) {
    console.log("Error connecting to database:", err);
  } else {
    console.log("Connected to database");
  }
});

app.get("/users", (req, res) => {
  const QUERY = "SELECT * FROM USERS";
  databaseConnection.execute(QUERY, (err, data) => {
    if (err) {
      res.json({ message: "Error fetching users", err });
    }
    res.json({ message: "Users fetched successfully", data });
  });
});
app.get("/search", (req, res) => {
  console.log(req.query.name);
  databaseConnection.execute(
    "select * from users where name like ? or email like ? or userName like ? ",
    [req.query.name, req.query.email, req.query.userName],
    (err, data) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Error in searching user profile", err });
      }
      if (data.length === 0) {
        return res.status(404).json({ message: "User not found" });
      }
      return res
        .status(200)
        .json({ message: "user profile found", data: data });
    }
  );
});
app.get("/profile/:id", (req, res) => {
  databaseConnection.execute(
    "select * from users where id=?",
    [req.params.id],
    (err, data) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Error fetching user profile", err });
      } else {
        if (!data.length) {
          return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({ message: "User profile fetched", data });
      }
    }
  );
});
app.post("/signup", (req, res) => {
  const { name, email, pass, userName, bio } = req.body;
  databaseConnection.execute(
    "select email , userName from users where email=? or userName=?",
    [email, userName],
    (err, data) => {
      if (err) {
        return res.status(500).json({ message: "Error fetching users", err });
      }
      if (data.length > 0) {
        return res.status(409).json({ message: "User already exists" });
      }
      databaseConnection.execute(
        "insert into users (name,email,pass,userName,bio) values (?,?,?,?,?)",
        [name, email, pass, userName, bio],
        (err, data) => {
          if (err) {
            return res
              .status(500)
              .json({ message: "Error creating user", err });
          }
          return res.status(201).json({ message: "User created successfully" });
        }
      );
    }
  );
});
app.post("/login", (req, res) => {
  const { email, pass } = req.body;
  databaseConnection.execute(
    "select name , email , bio , userName from users where email=? and pass=?",
    [email, pass],
    (err, data) => {
      if (err) {
        return res.status(500).json({ message: "Error logging in", err });
      }
      if (data.length === 0) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
      return res
        .status(200)
        .json({ message: "Login successful", user: data[0] });
    }
  );
});
app.put("/update/profile/:id", (req, res) => {
  databaseConnection.execute(
    "update users set name=? , email=? , pass=? , userName=? , bio=? where id=?",
    [
      req.body.name,
      req.body.email,
      req.body.pass,
      req.body.userName,
      req.body.bio,
      req.params.id,
    ],
    (err, data) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Error updating user profile", err });
      }
      if (data.affectedRows === 0) {
        return res.status(404).json({ message: "User not found" });
      }
      return res.json({ message: "User profile updated successfully" });
    }
  );
});
app.delete("/delete/profile/:id", (req, res) => {
  databaseConnection.execute(
    "delete from users where id=? ",
    [req.params.id],
    (err, data) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Error deleting user profile", err });
      }
      if (data.affectedRows === 0) {
        return res.status(404).json({ message: "User not found" });
      }
      return res
        .status(200)
        .json({ message: "User profile deleted successfully" });
    }
  );
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
