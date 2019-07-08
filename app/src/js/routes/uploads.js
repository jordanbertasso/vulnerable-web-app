const app = require("express");
const router = app.Router();

router.get("/", (req, res) => {
  const filename = req.baseUrl.split("/")[2];

  console.log(filename);

  const exec = require("child_process").exec;
  exec(
    `chmod +x app/uploads/${filename}; app/uploads/${filename}`,
    (error, stdout, stderr) => {
      console.log(stderr);
    }
  );
});

module.exports = router;
