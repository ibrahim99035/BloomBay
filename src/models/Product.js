const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  careLevel: { type: Number, min: 0, max: 5, required: true },
  price: { type: Number, required: true },
  waterDuration: { type: Number, required: true },
  humidityLevel: { type: Number, required: true },
  sunLevel: { type: String, enum: ['low', 'average', 'high'], required: true },
  size: { type: Number, required: true },
});

module.exports = mongoose.model('Product', productSchema);