import mongoose from 'mongoose';

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
    // console.log(newFeatures);
    // console.log(id);
    product.features.push(...newFeatures);
    product.save();
    // console.log(product);
  })
  .catch((err) => err);
