const express = require("express");
const cors = require("cors");
const getPort = require("get-port");
const deglob = require("deglob");
const path = require("path");
const { isFile } = require("path-type");

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", async (req, res) => {});

const opts = {
  cwd: "./",
  useGitIgnore: true,
  usePackageJson: false
};
deglob(["**/*.js"], opts, function(err, files) {
  files.map((file, index) => {
    console.log(path.parse(file));
  });
});

// getPort().then(port => {
//   app.listen(4000, () =>
//     console.log(`Example app listening on port http://localhost:4000!`)
//   );
// });
