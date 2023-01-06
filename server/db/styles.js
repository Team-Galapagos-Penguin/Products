import mongoose from 'mongoose';

mongoose.set('strictQuery', false);

mongoose.connect('mongodb://107.23.84.113:3002/sdc');

const styleSchema = mongoose.Schema({
  _id: Number,
  product_id: { type: Number, index: true },
  style_id: Number,
  name: String,
  original_price: String,
  sale_price: String,
  'default?': Boolean,
  photos: Array,
  skus: {},
});

const Style = mongoose.model('Style', styleSchema);

const photoSchema = mongoose.Schema({
  _id: Number,
  urls: Array,
});

const Photo = mongoose.model('Photo', photoSchema);

const skuSchema = mongoose.Schema({
  _id: Number,
  skus: {},
});

const Sku = mongoose.model('Sku', skuSchema);

export const saveManyStyles = (data) => Style.insertMany(data)
  .then(() => {
    console.log('style success');
  })
  .catch((err) => (err));

export const saveManyPhotos = (data) => Photo.insertMany(data)
  .then(() => {
    console.log('photos success');
  })
  .catch((err) => (err));

export const photosToStyles = () => Photo.find({})
  .cursor()
  .on('data', ((doc) => {
    const id = doc._id;
    const { urls } = doc;
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

export const saveManySkus = (data) => Sku.insertMany(data)
  .then(() => {
    console.log('skus success');
  })
  .catch((err) => (err));

export const skusToStyles = () => Sku.find({})
  .cursor()
  .on('data', ((doc) => {
    const id = doc._id;
    const { skus } = doc;
    return Style.findById(id)
      .then((style) => {
        style.skus = skus;
        style.save();
      })
      .catch((err) => err);
  }))
  .on('end', () => {
    console.log('skus added to styles');
  });

export const findStyles = (id) => Style.find({ product_id: id })
  .lean()
  .then((styles) => styles)
  .catch((err) => err);

