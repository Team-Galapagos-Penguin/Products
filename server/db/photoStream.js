import fs from 'fs';
import es from 'event-stream';
import csv from 'csv-parser';
import mongoose from 'mongoose';
import { saveManyPhotos, photosToStyles } from './styles.js';

mongoose.connect('mongodb://localhost/sdc');

const streamData = (filePath) => {
  let limit = 50000;
  let photos = {};

  fs
    .createReadStream(filePath)
    .pipe(csv())
    .on('error', (error) => error)

    .pipe(es.map((line, callback) => {
      if (Number(line.styleId) <= limit) {
        if (!photos[line.styleId]) {
          photos[line.styleId] = {
            _id: line.styleId,
            urls: [{ url: line.url, thumbnail_url: line.thumbnail_url }],
          };
        } else {
          photos[line.styleId].urls.push({ url: line.url, thumbnail_url: line.thumbnail_url });
        }
      }
      if (Number(line.styleId) > limit) {
        const results = Object.values(photos);
        saveManyPhotos(results);
        photos = {};
        limit += 2;
      }
      callback();
    }))

    .on('error', (error) => error)

    .on('end', () => {
      const results = Object.values(photos);
      saveManyPhotos(results);
      console.log('all done');
    });
};

// streamData('data/photos.csv');
// streamData('data_samples/photosSample.csv');
photosToStyles();
