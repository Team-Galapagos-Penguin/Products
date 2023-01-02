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


