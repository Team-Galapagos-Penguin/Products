/* eslint-disable import/prefer-default-export */
import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost/sdc');

const photoSchema = mongoose.Schema({
  product_id: Number,
  thumbnail_url: String,
  url: String,
});

const Photo = mongoose.model('Photo', photoSchema);

export function savePhoto(data) {
  console.log(data);
}

// export default savePhoto;
