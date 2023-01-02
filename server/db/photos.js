/* eslint-disable import/prefer-default-export */
import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost/sdc');

const photoSchema = mongoose.Schema({
  _id: Number,
  urls: Array,
});

const Photo = mongoose.model('Photo', photoSchema);

export const saveManyPhotos = (data) => Photo.insertMany(data)
  .then(() => {
    console.log('photos success');
  })
  .catch((err) => (err));
