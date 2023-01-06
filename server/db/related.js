import mongoose from 'mongoose';

mongoose.connect('mongodb://ec2-34-230-73-250.compute-1.amazonaws.com/sdc');

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
