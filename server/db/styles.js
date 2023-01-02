import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost/sdc');

const styleSchema = mongoose.Schema({
  _id: Number,
  product_id: Number,
  name: String,
  original_price: String,
  sale_price: String,
  default_style: Boolean,
  photos: Array,
  skus: Array,
});

const Style = mongoose.model('Style', styleSchema);

export const saveManyStyles = (data) => Style.insertMany(data)
  .then(() => {
    console.log('style success');
  })
  .catch((err) => (err));

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

export const photosToStyles = () => Photo.find({})
  .cursor()
  .on('data', ((doc) => {
    const id = doc._id;
    const urls = doc.urls;
    return Style.findById(id)
      .then((style) => {
        style.photos.push(...urls);
        style.save();
      })
      .catch((err) => err);
  }))
  .on('end', () => {
    console.log('photos added to style');
  });
