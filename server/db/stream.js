/* eslint-disable prefer-arrow-callback */
import fs from 'fs';
import es from 'event-stream';
import csv from 'csv-parser';
import { savePhotoStage, saveManyProductStage } from './db.js';

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
      saveManyProductStage(rows);
      console.log('all done');
    })
    .on('error', function (error) {
      return error;
    });
};

streamData('data/product.csv', saveManyProductStage);
