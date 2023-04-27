const express = require("express");
const cors = require("cors");
const sessions = require('express-session');
const cookieParser = require("cookie-parser");
const app = express();
const dbConnect = require("./config/mongodb")
    // const methods = require("./metodos");
require("dotenv").config();
const path = require("path");
const bodyParser = require('body-parser');
const userController = require('./controllers/userController');
const moviesController = require('./controllers/moviesController');
const viewsController = require('./controllers/viewsController');

// creating 24 hours from milliseconds
const oneDay = 1000 * 60 * 60 * 24;

//session middleware
app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

dbConnect();
app.use(cors());

const port = process.env.PORT || 3000;

app.use("/", viewsController);
app.use("/users", userController);
// app.use("/admin", methods);
app.use("/movies", moviesController);

app.listen(port, () => {
    console.log(`*** servidor escuchando en puerto: ${port} ***`);
});