"use strict";

require("dotenv").config();
const express = require("express");
const fileUpload = require("express-fileupload");
const session = require("express-session");
const bodyParser = require("body-parser");
const path = require("path");

// Initialise app and router
const app = express();

// Constants
const HOST = process.env.HOST;
const PORT = process.env.PORT;

// Middlware
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true
  })
);
app.enable("trust proxy");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(fileUpload());

// Routes
const login = require("./routes/login.js");
const home = require("./routes/home.js");
const upload = require("./routes/upload.js");
const uploads = require("./routes/uploads.js");
const auth = require("./routes/auth.js");

app.use(express.static(path.join(__dirname + "/../public")));

console.log(path.join(__dirname + "/../public"));

app.use("/", login);
app.use("/home", home);
app.use("/upload", upload);
app.use("/uploads/*", uploads);
app.use("/auth", auth);

app.listen(PORT, HOST);

console.log(`Listening on http://${HOST}:${PORT}`);
