exports.download = (req, res) => {
  // const file = `${__dirname}/upload-folder/dramaticpenguin.MOV`;
  // res.download(file);
  res.status(204).end();
};

exports.upload = async (req, res) => {
  console.log(req.file);
  res.status(204).end();
};
