const dirTree = require("directory-tree");

exports.index = (req, res) => {
  const { directory } = req.body;
  return res.json(dirTree(directory));
};
