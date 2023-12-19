const express = require("express");
const app = express();
const path = require("path");
const authenticateToken = require('../middleware/authenticateToken');
const signupRoute = require("../routes/signup");
const loginRoute = require("../routes/login");
const usernamesRoute = require("../routes/usernames");
const logoutRoute = require("../routes/logout");
const cookieParser = require("cookie-parser");
const { error } = require("console");
const port = process.env.PORT || 3000;

// Servir les fichiers statiques (CSS, JS, etc.) depuis le dossier public
app.use(express.static(path.join(__dirname, "../public")));
app.use(cookieParser());
// Route pour la page d'accueil
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../index.html"));
});


// Utiliser les middlewares des différentes routes
app.use("/", signupRoute); // Middleware pour l'inscription
app.use("/", loginRoute);  // Middleware pour la connexion
app.use("/", usernamesRoute); // Middleware pour récupérer les noms d'utilisateur
app.use("/", logoutRoute); // Middleware pour la déconnexion

app.use('/profil', authenticateToken, (req, res) => {
  res.sendFile(path.join(__dirname, "../profil.html"));

});
app.get('/dashboard', authenticateToken, (req, res) => {
  res.sendFile(path.join(__dirname, "../dashboard.html"));

});


app.listen(port, () => console.log(`Listening on port ${port}`));
