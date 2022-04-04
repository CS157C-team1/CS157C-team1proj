require('dotenv').config();
const express = require('express')
const cors = require('cors')
const app = express();
const port = 8080;

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
  credentials: true,
}))

const authRoutes = require('./routes/authGoogle')
app.use('/auth', authRoutes)

app.get('/', (req, res) => {
  res.send('Hello World! Project is Working w/updates')
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});