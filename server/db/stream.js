/* eslint-disable prefer-arrow-callback */
import fs from 'fs';
import es from 'event-stream';
import { savePhotoStage, saveProductStage } from './db.js';

const streamData = () => {
  fs
    .createReadStream('data/product.csv')
    .pipe(es.split())
    // remove first line with column names?

    .pipe(es.map((line, i) => {
      saveProductStage(line.split(','));
    }))
    .on('error', function (error) {
      return error;
    })
    .on('end', function () {
      console.log('all done');
    });
};

streamData();
