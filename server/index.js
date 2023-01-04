import * as dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import { findOneProduct } from './db/products.js';
import { findStyles } from './db/styles.js';
import { findRelated } from './db/related.js';

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// GET product info
app.get('/products/:product_id', (req, res) => {
  const id = req.params.product_id;
  return findOneProduct(id)
    .then((product) => {
      res.json(product);
    })
    .catch((err) => err);
});

// GET product styles
app.get('/products/:product_id/styles', (req, res) => {
  const id = req.params.product_id;
  return findStyles(id)
    .then((styles) => {
      const result = {
        product_id: id,
        results: styles,
      };
      res.json(result);
    })
    .catch((err) => err);
});

// GET related products
app.get('/products/:product_id/related', (req, res) => {
  const id = req.params.product_id;
  return findRelated(id)
    .then((related) => {
      res.json(related);
    })
    .catch((err) => err);
});

app.listen(process.env.PORT);
console.log(`Listening at http://localhost:${process.env.PORT}`);
