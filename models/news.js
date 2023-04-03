const mongoose = require('mongoose')

const newsSchema = new mongoose.Schema({
    title: { type: String, required: true },
    category: { type: String, enum: ['POLITICAL', 'SPORTS', 'BUSINESS', 'ENTERTAINMENT', 'OTHER'], required: true },
    description: { type: String, required: true },
  });
  
  const News = mongoose.model('News', newsSchema);
  module.exports = News
  
  