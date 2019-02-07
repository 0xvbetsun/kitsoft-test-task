exports.ping = (req, res) => {
  const data = 'pong';
  // eslint-disable-next-line no-underscore-dangle
  const diff = process.hrtime(req._startAt);
  const handlingTime = diff[0] * 1e3 + diff[1] * 1e-6;
  const meta = { handlingTime };

  res.json({ data, meta });
};
