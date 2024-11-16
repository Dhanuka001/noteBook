const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  color: { type: String, required: true },
  content: { type: String, default: '' },
  isFavourite: { type: Boolean, default: false },
  deleted: { type: Boolean, default: false },
});

module.exports = mongoose.model('Note', noteSchema);