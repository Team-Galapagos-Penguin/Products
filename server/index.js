import * as dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.listen(process.env.PORT);
console.log(`Listening at http://localhost:${process.env.PORT}`);
