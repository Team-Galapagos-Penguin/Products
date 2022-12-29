import fs from 'fs';
import es from 'event-stream';
import csv from 'csv-parser';
import mongoose from 'mongoose';
import { addFeatures } from './products.js';

mongoose.connect('mongodb://localhost/sdc');

const streamData = (filePath) => {
  const cb = () => {
    console.log('the end');
  };
  let currentId = 0;
  let currentFeatures = [];

  const newFeature = (line) => {
    const feature = {
      feature: line.feature,
      value: line.value,
    };
    currentFeatures.push(feature);
  };

  fs
    .createReadStream(filePath)
    .pipe(csv())
    .on('error', (error) => error)
    .pipe(es.map((line, cb) => {
      if (currentId === 0) {
        currentId = line.product_id;
      }
      if (currentId !== line.product_id) {
        addFeatures(currentId, currentFeatures)
          .then(() => {
            currentId = line.product_id;
            currentFeatures = [];
          });
      }
      if (currentId === line.product_id) {
        newFeature(line);
      }
      cb();
    }))

    .on('end', () => {
      addFeatures(currentId, currentFeatures);
      console.log('all done');
    })
    .on('error', (error) => error);
};

// streamData('data_samples/featuresSample.csv');
streamData('data/features.csv');
