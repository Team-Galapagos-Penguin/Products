import fs from 'fs';
import es from 'event-stream';
import csv from 'csv-parser';
import mongoose from 'mongoose';
import { addFeatures } from './products.js';

mongoose.connect('mongodb://localhost/sdc');

const streamData = (filePath) => {
  let limit = 10;
  const increaseAmount = 10;
  let features = {};

  fs
    .createReadStream(filePath)
    .pipe(csv())
    .on('error', (error) => error)

    .pipe(es.mapSync((line, callback) => {
      if (Number(line.product_id) === limit) {
        for (let i = limit - increaseAmount; i <= limit; i += 1) {
          es.pause();
          addFeatures(i, features[i]);
          es.resume();
        }
        features = {};
        limit += 10;
        console.log('features added');
      }
      if (!features[line.product_id]) {
        features[line.product_id] = [{ feature: line.feature, value: line.value }];
      } else {
        features[line.product_id].push({ feature: line.feature, value: line.value });
      }
      callback();
    }))

    .on('error', (error) => error)

    .on('end', () => {
      for (let i = limit - increaseAmount; i <= limit; i += 1) {
        addFeatures(i, features[i]);
      }
      console.log('all done');
    });
};

// streamData('data_samples/featuresSample.csv');
streamData('data/features.csv');

// .pipe(es.map((line, callback) => {
//   const id = line.product_id;
//   if (Number(id) === limit) {
//     for (let i = limit - increaseAmount; i <= limit; i += 1) {
//       const productId = i;
//       const feats = features[productId];
//       addFeatures(productId, feats);
//     }
//     features = {};
//     limit += 10000;
//     console.log('features added');
//   }
//   if (!features[id]) {
//     features[id] = [];
//     features[id].push({ feature: line.feature, value: line.value });
//   } else {
//     features[id].push({ feature: line.feature, value: line.value });
//   }
//   callback(null);
// }))
