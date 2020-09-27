require('./config');

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const apps = require('./routes/apps');
// const playerCounts = require('./routes/playerCounts');
const { getDatabase } = require('./middleware/db');

const app = express();

app.use(
  cors({
    origin: 'http://localhost:3000',
    allowedHeaders: ['x-auth', 'Content-Type'],
    exposedHeaders: ['x-auth']
  })
);
app.use(express.static(path.resolve(__dirname, '../../dist')));
app.use(bodyParser.json());
app.use(getDatabase);
app.get('/', async (req, res) => {
  const app = await req.db.models.App.findByPk(39210);
  console.log(app.name);
  // console.log(req.db);
  res.sendStatus(200);
})

app.use('/app', apps);
// app.use('/playercount', playerCounts);

module.exports = { app };