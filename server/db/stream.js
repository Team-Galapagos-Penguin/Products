/* eslint-disable prefer-arrow-callback */
import fs from 'fs';
import es from 'event-stream';
import csv from 'csv-parser';
import mongoose from 'mongoose';
import { saveManyProduct, editProduct } from './products.js';
import { saveManyFeature, findFeature } from './features.js';
import saveManyPhoto from './photos.js';
import saveManySku from './skus.js';
import saveManyStyle from './styles.js';

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
    .on('error', function (error) {
      return error;
    })
    .pipe(es.map((line, cb) => {
      if (rows.length < limit) {
        line._id = line.id;
        rows.push(line);
      } else {
        insertFunc(rows);
        rows = [];
        rows.push(line);
      }
      cb();
    }))

    .on('end', function () {
      insertFunc(rows);
      console.log('all done');
    })
    .on('error', function (error) {
      return error;
    });
};

// streamData('data_samples/productSample.csv', saveManyProduct);
// streamData('data/features.csv', saveManyFeature);
// streamData('data/photos.csv', saveManyPhoto);
// streamData('data/skus.csv', saveManySku);
// streamData('data/styles.csv', saveManyStyle);
// streamData('data_samples/productSample.csv', saveManyProduct);
findFeature(423444);
console.log('all data loaded');
