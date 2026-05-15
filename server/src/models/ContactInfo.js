const mongoose = require('mongoose');

const contactInfoSchema = new mongoose.Schema({
  phone: { type: String, default: '+1 (555) 123-4567' },
  email: { type: String, default: 'hello@leadflow.com' },
  address: { type: String, default: '123 Business Ave, Suite 100, New York, NY 10001' },
});

module.exports = mongoose.model('ContactInfo', contactInfoSchema);
