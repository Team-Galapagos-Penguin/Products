import mongoose from 'mongoose';

mongoose.set('strictQuery', false);

mongoose.connect('mongodb://ec2-3-80-134-66.compute-1.amazonaws.com/sdc')
  .then(() => {
    console.log('related connected to db')
  })
  .catch((err) => err);

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
