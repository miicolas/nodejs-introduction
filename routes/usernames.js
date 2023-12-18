// Dans votre fichier de routes
// routes/usernames.js
const express = require("express");
const { query } = require("../view/queries");

const router = express.Router();

router.get("/usernames", async (req, res) => {
  try {
    const usernames = await query("SELECT username FROM account");
    res.json({ usernames });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching usernames" });
  }
});

module.exports = router;
