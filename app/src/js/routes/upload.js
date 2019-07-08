const app = require("express");
const router = app.Router();
const path = require("path");
const fileUpload = require("express-fileupload");

router.post("/", function(req, res) {
  let uploadedFile = req.files.file;
  res.send(
    `<h1>Received file!</h1><p>Your file is available to view at /uploads/${
      uploadedFile.name
    }`
  );

  uploadedFile.mv(
    path.join(__dirname + `/../../../uploads/${uploadedFile.name}`)
  );

  console.log(
    `${req.files.file.name} uploaded to /uploads/${req.files.file.name}`
  );
});

module.exports = router;
