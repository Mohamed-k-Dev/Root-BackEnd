export function signup(req, res) {
  res.status(201).json({ message: "User registered successfully" });
}

export function login(req, res) {
  res.status(201).json({ message: "User logged in successfully" });
}
