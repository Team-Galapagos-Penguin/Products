import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost/sdc');

const featureSchema = mongoose.Schema({
  product_id: Number,
  feature: String,
  value: String,
});

const Feature = mongoose.model('Feature', featureSchema);
