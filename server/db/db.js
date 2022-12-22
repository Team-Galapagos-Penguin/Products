// import mongoose from 'mongoose';

// mongoose.connect('mongodb://localhost/sdc');

// const productSchema = mongoose.Schema({
//   id: Number,
//   campus: String,
//   name: String,
//   slogan: String,
//   description: String,
//   category: String,
//   default_price: String,
//   timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
//   related: Array,
// });

// const Product = mongoose.model('Product', productSchema);

// const featureSchema = mongoose.Schema({
//   product_id: Number,
//   feature: String,
//   value: String,
// });

// const Feature = mongoose.model('Feature', featureSchema);

// const styleSchema = mongoose.Schema({
//   product_id: Number,
//   style_id: Number,
//   name: String,
//   original_price: String,
//   sale_price: String,
//   'default?': Boolean,
// });

// const Style = mongoose.model('Style', styleSchema);

// const photoSchema = mongoose.Schema({
//   product_id: Number,
//   thumbnail_url: String,
//   url: String,
// });

// const Photo = mongoose.model('Photo', photoSchema);

// const skuSchema = mongoose.Schema({
//   product_id: Number,
//   quantity: Number,
//   size: String,
// });

// const Sku = mongoose.model('Sku', skuSchema);
