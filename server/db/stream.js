/* eslint-disable prefer-arrow-callback */
import fs from 'fs';
import es from 'event-stream';
import csv from 'csv-parser';
import saveManyProduct from './product.js';
import saveManyFeature from './feature.js';
import saveManyPhoto from './photo.js';
import saveManySku from './sku.js';
import saveManyStyle from './style.js';

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

streamData('data/product.csv', saveManyProduct);
streamData('data/features.csv', saveManyFeature);
streamData('data/photos.csv', saveManyPhoto);
streamData('data/skus.csv', saveManySku);
streamData('data/styles.csv', saveManyStyle);
console.log('all data loaded');