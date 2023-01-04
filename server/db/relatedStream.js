import fs from 'fs';
import es from 'event-stream';
import csv from 'csv-parser';
import mongoose from 'mongoose';
import { saveManyRelated } from './related.js';

mongoose.connect('mongodb://localhost/sdc');

const streamData = (filePath) => {
  let limit = 500000;
  let data = {};

  fs
    .createReadStream(filePath)
    .pipe(csv())
    .on('error', (error) => error)

    .pipe(es.map((line, callback) => {
      if (Number(line.current_product_id) > limit) {
        const results = Object.values(data);
        saveManyRelated(results);
        data = {};
        limit += 50000;
      }
      if (Number(line.current_product_id) <= limit) {
        if (!data[line.current_product_id]) {
          data[line.current_product_id] = {
            _id: line.current_product_id,
            products: [line.related_product_id],
          };
        } else {
          data[line.current_product_id].products.push(line.related_product_id);
        }
      }
      callback();
    }))

    .on('error', (error) => error)

    .on('end', () => {
      const results = Object.values(data);
      saveManyRelated(results);
      console.log('all done');
    });
};

streamData('data/related.csv');
// streamData('data_samples/relatedSample.csv');
