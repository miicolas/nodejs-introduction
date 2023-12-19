const express = require("express");
const bcrypt = require("bcrypt");
const { query } = require("../view/queries");
const jwt = require("jsonwebtoken");
const router = express.Router();
const authenticateToken = require('../middleware/authenticateToken'); // Importez le middleware
const cookieParser = require("cookie-parser"); // Importez le module cookie-parser


router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const result = await query("SELECT * FROM account WHERE username = ?", [
      username,
    ]);

    // Vérifiez si l'utilisateur existe dans la base de données
    if (result.length === 0) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    const hashedPassword = result[0].password;

    // Vérifiez le mot de passe
    const validPassword = await bcrypt.compare(password, hashedPassword);
    if (!validPassword) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    // Génération du token
    const user = result[0].id;

// Génération du token et stockage dans un cookie
const token = jwt.sign({ user }, "secretKey");
console.log(token);
res.cookie("AuthToken", token, {
  httpOnly: true, // Empêche l'accès via JavaScript côté client
  secure: false, // Uniquement transmis sur HTTPS (nécessaire en production)
  sameSite: "strict", // Restreint l'envoi du cookie aux requêtes du même site
}).redirect('/profil');


  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error logging in" });
  }
});

module.exports = router;
