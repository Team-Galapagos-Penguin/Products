import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost/sdc');

const skuSchema = mongoose.Schema({
  product_id: Number,
  quantity: Number,
  size: String,
});

const Sku = mongoose.model('Sku', skuSchema);
