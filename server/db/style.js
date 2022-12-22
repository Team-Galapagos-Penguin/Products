import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost/sdc');

const styleSchema = mongoose.Schema({
  product_id: Number,
  style_id: Number,
  name: String,
  original_price: String,
  sale_price: String,
  'default?': Boolean,
});

const Style = mongoose.model('Style', styleSchema);
