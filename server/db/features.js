/* eslint-disable import/prefer-default-export */
import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost/sdc');

const featureSchema = mongoose.Schema({
  _id: Number,
  // product_id: { name: 'product_id', index: true, unique: false, type: Number },
  product: { type: Number, ref: 'Product' },
  feature: String,
  value: String,
});

const Feature = mongoose.model('Feature', featureSchema);
// const index = () => {
//   Feature.createIndex({ name: 'product_id' }, { index: true }, { unique: false }, (err, result) => {
//   console.log(result);
//   callback(result);
// });
// }
export const saveManyFeature = (data) => {
  Feature.insertMany(data)
    .then(() => {
      console.log(' features success');
    })
    .catch((err) => (err));
};

export const findFeature = (id) => Feature.find({ product_id: id })
  .then((res) => console.log('feature', res))
  .catch((err) => (err));
