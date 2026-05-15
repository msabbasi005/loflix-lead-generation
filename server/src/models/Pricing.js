const mongoose = require('mongoose');

const pricingSchema = new mongoose.Schema({
  tier: { type: String, required: true, trim: true },
  price: { type: String, required: true, trim: true },
  features: [{ type: String, trim: true }],
  highlighted: { type: Boolean, default: false },
  order: { type: Number, default: 0 },
});

module.exports = mongoose.model('Pricing', pricingSchema);
