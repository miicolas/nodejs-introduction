const express = require("express");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const authenticateToken = require('../middleware/authenticateToken');
const signupRoute = require("../routes/signup");
const loginRoute = require("../routes/login");
const logoutRoute = require("../routes/logout");


const { error } = require("console");
const port = process.env.PORT || 3000;


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "../../public")));
app.use(cookieParser());
// Route pour la page d'accueil
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../../frontend/index.html"));
});


app.use("/", signupRoute); 
app.use('/', loginRoute);
app.use("/", logoutRoute);

app.use('/profil', authenticateToken, (req, res) => {
  res.sendFile(path.join(__dirname, "../../frontend/profil.html"));

});
app.get('/dashboard', authenticateToken, (req, res) => {
  res.sendFile(path.join(__dirname, "../../frontend/dashboard.html"));

});


app.listen(port, () => console.log(`Listening on port ${port}`));
