/* eslint-disable prefer-arrow-callback */
import fs from 'fs';
import es from 'event-stream';
import { savePhoto } from './photo.js';

// fs.createReadStream('../photosSample.csv')
//   .on('err', () => err)
//   .pipe(csvParser())
//   .on('data', (row) => {
//     console.log(row);
//   })
//   .on('end', () => {
//     console.log('run');
//   });

// const s = fs
//   .createReadStream('../photosSample.csv')
//   .pipe(es.split())
//   .pipe(es.parse())
//   .pipe(console.log('something'));

const streamData = () => {
  fs
    .createReadStream('photosSample.csv')
    .pipe(es.split())
    // .pipe(es.stringify())
    // .pipe(es.parse(','))
    // eslint-disable-next-line prefer-arrow-callback
    .pipe(es.map((line, i) => {
      line.split(',');
      // console.log(line.split(','));
      savePhoto(line.split(','));
    }))
    .on('error', function (error) {
      return error;
    })
    .on('end', function () {
      console.log('all done');
    });
};

streamData();
