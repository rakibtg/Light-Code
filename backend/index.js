const express = require("express");
const cors = require("cors");
const getPort = require("get-port");
const deglob = require("deglob");
const path = require("path");

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", async (req, res) => {
  const opts = {
    cwd: "./",
    useGitIgnore: false,
    usePackageJson: false
  };
  deglob(["**/*.js"], opts, function(err, files) {
    let nestedFiles = {};
    files.map((file, index) => {
      let partialSegment = "";
      file.split(path.sep).map((segment, segmentIndex) => {
        partialSegment = partialSegment + segment + path.sep;
        if (!nestedFiles[partialSegment]) {
          nestedFiles[partialSegment] = {
            path: file,
            label: segment,
            partialSegment,
            child: []
          };
        } else {
          nestedFiles[partialSegment].child.push({
            path: file,
            label: segment,
            partialSegment,
            child: []
          });
        }
      });
    });
    res.json({ "light-code": "Yes", nestedFiles });
  });
});

getPort().then(port => {
  app.listen(4000, () =>
    console.log(`Example app listening on port http://localhost:4000!`)
  );
});
