import fs from 'fs';
import es from 'event-stream';
import csv from 'csv-parser';
import mongoose from 'mongoose';
import { saveManyStyles } from './styles.js';

mongoose.connect('mongodb://localhost/sdc');

const streamData = (filePath) => {
  const limit = 50000;
  let rows = [];

  fs
    .createReadStream(filePath)
    .pipe(csv())
    .on('error', (error) => error)

    .pipe(es.map((line, callback) => {
      if (rows.length === limit) {
        saveManyStyles(rows);
        rows = [];
      }
      line._id = line.id;
      line.product_id = line.productId;
      rows.push(line);
      callback();
    }))

    .on('error', (error) => error)

    .on('end', () => {
      saveManyStyles(rows);
      console.log('all done');
    });
};

streamData('data/styles.csv', saveManyStyles);
// streamData('data_samples/stylesSample.csv', saveManyStyles);
