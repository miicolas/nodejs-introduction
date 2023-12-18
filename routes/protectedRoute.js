const express = require('express');
const authenticateToken = require('../middleware/authenticateToken');
const router = express.Router();

// Route protégée nécessitant une authentification pour accéder à la page HTML
router.get('/protected-route', authenticateToken, (req, res) => {
  // Si l'utilisateur est authentifié, servez la page HTML ou renvoyez les informations utilisateur
  res.sendFile('../protected-page.html');
});

module.exports = router;
