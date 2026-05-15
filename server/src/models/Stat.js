const mongoose = require('mongoose');

const statSchema = new mongoose.Schema({
  label: { type: String, required: true, trim: true },
  value: { type: String, required: true, trim: true },
  order: { type: Number, default: 0 },
});

module.exports = mongoose.model('Stat', statSchema);
