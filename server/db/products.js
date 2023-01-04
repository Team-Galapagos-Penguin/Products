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
    product.features.push(...newFeatures);
    product.save();
    if (id % 200000 === 0) {
      console.log('features added up to product id', id);
    }
    if (id === 1000011) {
      console.log('features added up to product id 1,000,011. all done!');
    }
  })
  .catch((err) => err);

export const findOneProduct = (id) => Product.findById(id)
  .lean()
  .then((product) => product)
  .catch((err) => err);

export const findManyProducts = (total) => {
    total = total || 5;
    let count = 0;
    const products = [];
    Product.find({})
      // .select('_id, name, slogan, description, category, default_price, createdAt, updatedAt')
      .lean()
      .limit(total)
      .cursor()
      .on('error', (err) => err)
      .on('data', ((doc) => {
        delete doc.features;
        if (count < total) {
          products.push(doc);
          count++;
        }
      }))
      .on('end', () => {
        return products;
      })
  };