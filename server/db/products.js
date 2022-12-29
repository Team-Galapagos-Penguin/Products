import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost/sdc');

const featureSchema = mongoose.Schema({
  feature: String,
  value: String,
});

// const feature = mongoose.model('Feature', featureSchema);

const productSchema = mongoose.Schema(
  {
    _id: Number,
    name: String,
    slogan: String,
    description: String,
    category: String,
    default_price: String,
    features: [featureSchema],
  },
  { timestamps: true },
);

const Product = mongoose.model('Product', productSchema);

export const saveManyProduct = (data) => Product.insertMany(data)
  .then(() => {
    console.log('product success');
  })
  .catch((err) => (err));

// export const editProduct = (product) => {
//   line._id = line.id;
//   console.log(product);
// };

// export const addFeatures = (id, newFeatures) => {
//   return Product.findByIdAndUpdate(id, { features: newFeatures})
//     .then(() => {
//       console.log('features added');
//     })
//     .catch((err) => err);
//   }

export const addFeatures = (id, newFeatures) => Product.findById(id)
  .then((product) => {
    product.features.concat(newFeatures);
    product.save();
  })
  .catch((err) => err);
