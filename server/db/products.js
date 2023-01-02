import mongoose from 'mongoose';
import fs from 'fs';
import es from 'event-stream';
import csv from 'csv-parser';

mongoose.connect('mongodb://localhost/sdc');

const productSchema = mongoose.Schema(
  {
    _id: Number,
    name: String,
    slogan: String,
    description: String,
    category: String,
    default_price: String,
    features: Array,
  },
  { timestamps: true },
);

const Product = mongoose.model('Product', productSchema);

export const saveManyProduct = (data) => Product.insertMany(data)
  .then(() => {
    console.log('product success');
  })
  .catch((err) => (err));

export const addFeatures = (id, newFeatures) => Product.findById(id)
  .then((product) => {
    product.features.push(...newFeatures);
    product.save();
    if (id === 200000) {
      console.log('features added up to product id 200,000');
    }
    if (id === 400000) {
      console.log('features added up to product id 400,000');
    }
    if (id === 600000) {
      console.log('features added up to product id 600,000');
    }
    if (id === 800000) {
      console.log('features added up to product id 800,000');
    }
    if (id === 1000000) {
      console.log('features added up to product id 1,000,000');
    }
    if (id === 1000011) {
      console.log('features added up to product id 1,000,011');
    }
  })
  .catch((err) => err);

