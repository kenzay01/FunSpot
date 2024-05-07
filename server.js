import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import pg from "pg";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "funSpot",
  password: "mrfletgg2009",
  port: 5432,
});
db.connect();
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/register", async (req, res) => {
  const email = req.body.username;
  const password = req.body.password;

  try {
    const checkResult = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (checkResult.rows.length > 0) {
      res.status(400).json({ message: "User already exists" }); /// Change this
    } else {
      const result = await db.query(
        "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *",
        [email, password]
      );
      res.cookie("userEmail", email);
      res.redirect("/");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/login", async (req, res) => {
  const email = req.body.username;
  const password = req.body.password;

  try {
    const result = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (result.rows.length > 0) {
      const user = result.rows[0];
      const storedPassword = user.password;
      if (password === storedPassword) {
        res.cookie("userEmail", email);
        res.redirect("/");
      } else {
        res.status(400).json({ message: "Incorrect password" });
      }
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
