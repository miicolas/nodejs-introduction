const express = require("express");
const app = express();
const path = require("path");
const authenticateToken = require('../middleware/authenticateToken');
const signupRoute = require("../routes/signup");
const loginRoute = require("../routes/login");
const usernamesRoute = require("../routes/usernames");
const cookieParser = require("cookie-parser");
const port = process.env.PORT || 3000;

// Servir les fichiers statiques (CSS, JS, etc.) depuis le dossier public
app.use(express.static(path.join(__dirname, "../public")));
app.use(cookieParser());
// Route pour la page d'accueil
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../index.html"));
});

// Route protégée nécessitant une authentification pour y accéder
app.get('/protected-route', authenticateToken, (req, res) => {
  res.sendFile(path.join(__dirname, "../protected-route.html"));
});

// Utiliser les middlewares des différentes routes
app.use("/", signupRoute); // Middleware pour l'inscription
app.use("/", loginRoute);  // Middleware pour la connexion
app.use("/", usernamesRoute); // Middleware pour récupérer les noms d'utilisateur

app.listen(port, () => console.log(`Listening on port ${port}`));
