const mongoose = require('mongoose');

const aboutContentSchema = new mongoose.Schema({
  story: {
    type: String,
    default:
      'We help businesses grow through data-driven marketing strategies and lead generation systems that deliver measurable results.',
  },
  mission: {
    type: String,
    default:
      'Our mission is to empower brands with tools, insights, and campaigns that turn attention into loyal customers.',
  },
  values: [
    {
      title: { type: String, trim: true },
      description: { type: String, trim: true },
    },
  ],
});

module.exports = mongoose.model('AboutContent', aboutContentSchema);
