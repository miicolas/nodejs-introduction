const express = require("express");
const bodyParser = require("body-parser");
const { query } = require("../view/queries");

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get("/logout", async (req, res) => {
    try {
      res.clearCookie('AuthToken').redirect('../');
      console.log('logout');
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error logging out" });
    }
  });
  

module.exports = router;
