"use strict";

require("dotenv").config();
const express = require("express");
const fileUpload = require("express-fileupload");
const session = require("express-session");
const bodyParser = require("body-parser");
const path = require("path");
const md5 = require("md5");

// Import database
const dblib = require("./db.js");
const db = dblib.db;

// Constants
const HOST = process.env.HOST;
const PORT = process.env.PORT;

// Initialise app and router
const app = express();
const router = express.Router();

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

// ---------- Route / ----------
router.get("/", function(request, response) {
  response.sendFile(path.join(__dirname + "/../static/html/login.html"));
});

router.get("/style.css", function(request, response) {
  response.sendFile(path.join(__dirname + "/../static/css/style.css"));
});

// ---------- Route /auth ----------
router.post("/auth", function(request, response) {
  var username = request.body.username;
  var password = request.body.password;
  if (username && password) {
    console.log(`Username: ${username} Password: ${password}`);
    db.serialize(function() {
      // Check if username and password exist
      db.get(
        `SELECT * FROM users WHERE username = '${username}' AND password = '${md5(
          password
        )}'`,
        (err, row) => {
          if (err) {
            response.send("Invalid username or password");
            return console.log(err.message);
          }

          if (row != undefined) {
            request.session.loggedin = true;
            request.session.username = username;

            dblib.addDetails(
              username,
              request.ip,
              request.headers["user-agent"]
            );
            console.log(request.ip);
            console.log(request.headers["user-agent"]);
            response.redirect("/home");
          } else {
            console.log("Invalid login");

            response.send("Invalid username or password");
          }

          response.end();
        }
      );
    });
  } else {
    response.redirect("/");
    response.end();
  }
});

// ---------- Route /home ----------
router.get("/home", function(request, response) {
  console.log(request.session.loggedin);
  if (request.session.loggedin) {
    response.sendFile(path.join(__dirname + "/../static/html/home.html"));
  } else {
    response.send("Please login to view this page!");
  }
});

// ---------- Route /upload ----------
router.post("/upload", function(request, response) {
  let uploadedFile = request.files.file;
  response.send(
    `<h1>Received file!</h1><p>Your file is available to view at /uploads/${
      uploadedFile.name
    }`
  );

  uploadedFile.mv(path.join(__dirname + `/../../uploads/${uploadedFile.name}`));
});

// ---------- Route /uploads ----------
router.get(/uploads/, (req, res) => {
  const filename = req.path.split("/")[2];

  console.log(`${filename} uploaded to /app/uploads`);

  const exec = require("child_process").exec;
  exec(
    `chmod +x ../../uploads/${filename}; ../../uploads/${filename}`,
    (error, stdout, stderr) => {
      console.log(stderr);
    }
  );
});

app.use("/", router);
app.listen(PORT, HOST);

console.log(`Listening on http://${HOST}:${PORT}`);
