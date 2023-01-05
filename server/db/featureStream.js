import fs from 'fs';
import es from 'event-stream';
import csv from 'csv-parser';
import mongoose from 'mongoose';
import { saveManyFeatures, featuresToProducts } from './products.js';

mongoose.connect('mongodb://localhost/sdc');

const streamData = (filePath) => {
  let limit = 50000;
  let features = {};

  fs
    .createReadStream(filePath)
    .pipe(csv())
    .on('error', (error) => error)

    .pipe(es.map((line, callback) => {
      if (Number(line.product_id) > limit) {
        const results = Object.values(features);
        saveManyFeatures(results);
        features = {};
        limit += 50000;
      }
      if (Number(line.product_id) <= limit) {
        if (!features[line.product_id]) {
          features[line.product_id] = {
            _id: line.product_id,
            feats: [{ feature: line.feature, value: line.value }],
          };
        } else {
          features[line.product_id].feats.push({ feature: line.feature, value: line.value });
        }
      }
      callback();
    }))

    .on('error', (error) => error)

    .on('end', () => {
      const results = Object.values(features);
      saveManyFeatures(results);
      console.log('all done');
    });
};

// streamData('data_samples/featuresSample.csv');
// streamData('data/features.csv');
featuresToProducts();
