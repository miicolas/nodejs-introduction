// authenticateToken middleware
const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const token = req.cookies.AuthToken; // Récupération du token depuis les cookies

  if (!token) {
    return res.redirect('../'); // Redirection vers la page de connexion si le token est manquant
  }
  console.log ('token reçu')

  // Vérification du token
  jwt.verify(token, 'secretKey', (err, user) => {
    if (err) {
      return res.redirect('../'); // Redirection si le token est invalide
      console.log ('token invalide', err)
    }
    
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
