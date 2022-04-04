require('dotenv').config();
const express = require('express')
// const cors = require('cors')
const app = express();
const port = 8080;

app.get('/', (req, res) => {
  res.send('Hello World! Project is Working w/updates')
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});