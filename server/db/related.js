import mongoose from 'mongoose';

mongoose.set('strictQuery', false);

mongoose.connect('mongodb://ec2-107-23-84-113.compute-1.amazonaws.com:3002/sdc');

const relatedSchema = mongoose.Schema({
  _id: Number,
  products: Array,
});

const Related = mongoose.model('Related', relatedSchema);

export const saveManyRelated = (data) => Related.insertMany(data)
  .then(() => {
    console.log('related success');
  })
  .catch((err) => err);

export const findRelated = (id) => Related.findById(id)
  .then((result) => result.products)
  .catch((err) => err);
