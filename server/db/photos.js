/* eslint-disable import/prefer-default-export */
import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost/sdc');

const photoSchema = mongoose.Schema({
  id: Number,
  styleId: Number,
  thumbnail_url: String,
  url: String,
});

const Photo = mongoose.model('Photo', photoSchema);

const saveManyPhoto = (data) => Photo.insertMany(data)
  .then(() => {
    console.log('photos success');
  })
  .catch((err) => (err));

export default saveManyPhoto;
