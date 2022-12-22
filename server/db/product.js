import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost/sdc');

const productSchema = mongoose.Schema({
  id: Number,
  name: String,
  slogan: String,
  description: String,
  category: String,
  default_price: String,
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  related: Array,
});

const Product = mongoose.model('Product', productSchema);
