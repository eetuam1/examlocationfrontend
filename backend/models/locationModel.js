const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String },
  latitude: { type: Number },
  longitude: { type: Number },
  user_id: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Location', locationSchema);
