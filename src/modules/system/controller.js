exports.ping = (req, res) => {
  const data = 'pong';
  const diff = process.hrtime(res.locals.startedAt);
  const handlingTime = diff[0] * 1e3 + diff[1] * 1e-6;
  const meta = { handlingTime };

  res.json({ data, meta });
};
