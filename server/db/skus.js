import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost/sdc');

const skuSchema = mongoose.Schema({
  _id: Number,
  skus: {},
});

// skus: [
//   {
//     24233432: { quantity: 4, size: 3 },
//   24233232: { quantity: 4, size: 3 }
// }
// ]

const Sku = mongoose.model('Sku', skuSchema);

export const saveManySku = (data) => Sku.insertMany(data)
  .then(() => {
    console.log('skus success');
  })
  .catch((err) => (err));