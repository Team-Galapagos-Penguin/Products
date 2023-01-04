import fs from 'fs';
import es from 'event-stream';
import csv from 'csv-parser';
import mongoose from 'mongoose';
import { saveManySkus, skusToStyles } from './styles.js';

mongoose.connect('mongodb://localhost/sdc');

const streamData = (filePath) => {
  let limit = 50000;
  let data = {};

  fs
    .createReadStream(filePath)
    .pipe(csv())
    .on('error', (error) => error)

    .pipe(es.map((line, callback) => {
      if (Number(line.styleId) > limit) {
        const results = Object.values(data);
        saveManySkus(results);
        data = {};
        limit += 50000;
      }
      if (Number(line.styleId) <= limit) {
        if (!data[line.styleId]) {
          data[line.styleId] = {
            _id: line.styleId,
            skus: { [line.id]: { quantity: line.quantity, size: line.size } },
          };
        } else {
          data[line.styleId].skus[line.id] = { quantity: line.quantity, size: line.size };
        }
      }
      callback();
    }))

    .on('error', (error) => error)

    .on('end', () => {
      const results = Object.values(data);
      saveManySkus(results);
      console.log('all done');
    });
};

// streamData('data/skus.csv');
// streamData('data_samples/skusSample.csv');
skusToStyles();
