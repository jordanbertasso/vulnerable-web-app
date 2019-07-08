const express = require("express");
const router = express.Router();
const path = require("path");

// Login page route.
router.get("/", function(request, response) {
  console.log(request.session.loggedin);
  if (request.session.loggedin) {
    response.sendFile(path.join(__dirname + "/../../public/html/home.html"));
  } else {
    response.send("Please login to view this page!");
  }
});

router.get("/home.css", (req, res) => {
  res.sendFile(path.join(__dirname + "/../../public/css/home.css"));
});

module.exports = router;
