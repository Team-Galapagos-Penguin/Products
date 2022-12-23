import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost/sdc');

const skuSchema = mongoose.Schema({
  product_id: Number,
  quantity: Number,
  size: String,
});

const Sku = mongoose.model('Sku', skuSchema);

const saveManySku = (data) => Sku.insertMany(data)
  .then(() => {
    console.log('success');
  })
  .catch((err) => (err));

export default saveManySku;
