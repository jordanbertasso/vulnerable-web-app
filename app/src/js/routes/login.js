const express = require("express");
const router = express.Router();
const path = require("path");

// Login page route.
router.get("/", function(req, res) {
  res.sendFile(path.join(__dirname + "/../../public/html/login.html"));
});

router.get("/style.css", function(request, response) {
  response.sendFile(path.join(__dirname + "/../../public/css/login.css"));
});

module.exports = router;
