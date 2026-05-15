const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  icon: { type: String, required: true, trim: true, default: 'Zap' },
  order: { type: Number, default: 0 },
});

module.exports = mongoose.model('Service', serviceSchema);
