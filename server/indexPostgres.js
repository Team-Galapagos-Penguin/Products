const { PORT } = process.env;
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const dbModules = require('./postgres/postgresDB.js');

const sql = postgres('postgres://:password@host:port/database', {
  host: localhost,
  port: 3000,
  database: sdc,
  username: postgres,
  password: 1234,
});
