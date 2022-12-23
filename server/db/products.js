import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost/sdc');

const productSchema = mongoose.Schema({
  _id: Number,
  name: String,
  slogan: String,
  description: String,
  category: String,
  default_price: String,
  created_at: String,
  updated_at: String,
  features: [{ type: Number, ref: 'Feature' }],
});

const Product = mongoose.model('Product', productSchema);

export const saveManyProduct = (data) => Product.insertMany(data)
  .then(() => {
    console.log('success');
  })
  .catch((err) => (err));

  export const editProduct = (product) => {
    line._id = line.id;
    console.log(product);
  };

