const mongoose = require('mongoose');

const teamMemberSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  role: { type: String, required: true, trim: true },
  photo: { type: String, default: '' },
  order: { type: Number, default: 0 },
});

module.exports = mongoose.model('TeamMember', teamMemberSchema);
