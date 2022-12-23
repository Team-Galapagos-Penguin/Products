/* eslint-disable import/prefer-default-export */
import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost/sdc');

const productStageSchema = mongoose.Schema({
  id: Number,
  name: String,
  slogan: String,
  description: String,
  category: String,
  default_price: String,
  created_at: String,
  updated_at: String,
});

const ProductStage = mongoose.model('ProductStage', productStageSchema);

// export const saveProductStage = (data) => {
//   const created = new Date();

//   const newProduct = new ProductStage({
//     id: data.id,
//     name: data.name,
//     slogan: data.slogan,
//     description: data.description,
//     category: data.category,
//     default_price: data.default_price,
//     created_at: created.toISOString(),
//     updated: created.toISOString(),
//   });

//   return newProduct.save()
//     .then((product) => {

//       return product;
//     })
//     .catch((err) => err);
// };

export const saveManyProductStage = (data) => ProductStage.insertMany(data)
  .then(() => {
    console.log('success');
  })
  .catch((err) => (err));

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

const photoStageSchema = mongoose.Schema({
  id: Number,
  styleId: Number,
  thumbnail_url: String,
  url: String,
});

const PhotoStage = mongoose.model('PhotoStage', photoStageSchema);

export const savePhotoStage = (data) => {
  console.log(data[0]);

  const newPhoto = new PhotoStage({
    id: data[0],
    styleId: data[1],
    thumbnail_url: data[2],
    url: data[3],
  });

  return newPhoto.save()
    .then((photo) => {
      console.log(photo);
    })
    .catch((err) => err);
};

// const skuSchema = mongoose.Schema({
//   product_id: Number,
//   quantity: Number,
//   size: String,
// });

// const Sku = mongoose.model('Sku', skuSchema);
