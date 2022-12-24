import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost/sdc');

const styleSchema = mongoose.Schema({
  _id: Number,
  product: Number,
  name: String,
  original_price: String,
  sale_price: String,
  default_style: Boolean,
});

const Style = mongoose.model('Style', styleSchema);

const saveManyStyle = (data) => Style.insertMany(data)
  .then(() => {
    console.log('success');
  })
  .catch((err) => (err));

export default saveManyStyle;
