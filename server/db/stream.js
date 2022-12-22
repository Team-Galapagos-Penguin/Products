// import fs from 'fs';
// import es from 'event-stream';
// import csvParser from 'csv-parser';
const csv = require('csv-parser');
const fs = require('fs');
// const s = fs
//   .createReadStream('../photosSample.csv')
//   .pipe(es.split)
//   .pipe(es.parse)
//   .pipe(console.log(line))

fs.createReadStream('../photosSample.csv')
  .on('err', () => err)
  .pipe(csvParser())
  .on('data', (row) => {
    console.log(row);
  })
  .on('end', () => {
    console.log('run');
  });
