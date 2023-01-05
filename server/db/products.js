import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost/sdc');

const productSchema = mongoose.Schema(
  {
    _id: Number,
    id: Number,
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

const featureSchema = mongoose.Schema({
  _id: Number,
  feats: Array,
});

const Feature = mongoose.model('Feature', featureSchema);

export const saveManyProduct = (data) => Product.insertMany(data)
  .then(() => {
    console.log('product success');
  })
  .catch((err) => (err));

export const saveManyFeatures = (data) => Feature.insertMany(data)
  .then(() => {
    console.log('feature success');
  })
  .catch((err) => err);

export const findOneProduct = (id) => Product.findById(id)
  .lean()
  .then((product) => product)
  .catch((err) => err);

export const findManyProducts = (total) => Product.find({})
      .select('-features')
      .lean()
      .limit(total)
      .then((products) => products)
      .catch((err) => err);

export const featuresToProducts = () => Feature.find({})
  .cursor()
  .on('data', ((doc) => {
    const id = doc._id;
    const { feats } = doc;
    return Product.findById(id)
      .then((product) => {
        product.features = feats;
        product.save();
      })
      .catch((err) => err)
  }))
  .on('end', () => {
    console.log('features added to products');
  });