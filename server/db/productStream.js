import fs from 'fs';
import es from 'event-stream';
import csv from 'csv-parser';
import mongoose from 'mongoose';
import { saveManyProduct } from './products.js';

mongoose.connect('mongodb://localhost/sdc');

const streamData = (filePath, insertFunc) => {
  const cb = () => {
    console.log('the end');
  };
  const limit = 50000;
  let rows = [];
  fs
    .createReadStream(filePath)
    .pipe(csv())
    .on('error', (error) => error)
    .pipe(es.map((line, cb) => {
      if (rows.length < limit) {
        line._id = line.id;
        rows.push(line);
      } else {
        insertFunc(rows);
        rows = [];
        line._id = line.id;
        rows.push(line);
      }
      cb();
    }))

    .on('end', () => {
      insertFunc(rows);
      console.log('all done');
    });
    // .on('error', (error) => error);
};

streamData('data/product.csv', saveManyProduct);
// streamData('data_samples/productSample.csv', saveManyProduct);
console.log('all data loaded');
