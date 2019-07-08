const md5 = require("md5");
const express = require("express");
const router = express.Router();

// Import database
const dblib = require("../db.js");
const db = dblib.db;

router.post("/", function(request, response) {
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

            addDetails(username, request.ip, request.headers["user-agent"]);

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

function addDetails(username, ipAddress, userAgent) {
  db.run(
    `INSERT INTO userDetails (username, ipAddress, userAgent) VALUES ('${username}', '${ipAddress}', '${userAgent}')`,
    err => {
      if (err) {
        return console.log(err.message);
      }
    }
  );
}

module.exports = router;
