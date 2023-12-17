const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const { query } = require("../queries");

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());


router.post("/add", async (req, res) => {
    try {
    const { username, password } = req.body;
    const confirmUsername = await query(
      "SELECT username FROM account WHERE username = ?",
      [username]
    );
    if (!(username.length > 0) || !(password.length > 8)) {
      if (!(password.length > 8)) {
        return res.status(400).json({ error: "Password must be at least 8 characters" });
      }
      return res.status(400).json({ error: "Invalid username" });
    }
    if (confirmUsername.length > 0) {
      return res.status(400).json({ error: "Username already exists" });
    }
    console.log('check2');
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password before storing it
    console.log('check3');
    const result = await query(
      "INSERT INTO account (username, password) VALUES  (?, ?)",
      [username, hashedPassword] // Store the hashed password in the database
    );
    res.redirect("/");
    console.log('checkFinal');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error adding data" });
  }
});

module.exports = router;