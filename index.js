const server = require('./api/server.js');
const express = require('express');
const router = require('./router');

server.use('/accounts', router);
server.use(express.json());

server.get('/', (req, res) => {
  res.send('Welcome to db1 project!');
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`\n== API running on port ${PORT} ==\n`);
});
