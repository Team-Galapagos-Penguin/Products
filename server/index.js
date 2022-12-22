const { PORT } = process.env;
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const dbModules = require('./db/db.js');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.listen(PORT);
console.log(`Listening at http://localhost:${PORT}`);
