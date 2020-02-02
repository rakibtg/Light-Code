const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const getPort = require("get-port");
const app = express();

app.use(express.json());
app.use(cors());

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());

const fileExplorerController = require("./controllers/fileExplorer");

app.get("/", async (req, res) => {});
app.post("/files", fileExplorerController.index);

getPort().then(port => {
  app.listen(4000, () =>
    console.log(`Example app listening on port http://localhost:4000!`)
  );
});
