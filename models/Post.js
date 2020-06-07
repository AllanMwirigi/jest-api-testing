
const mongoose = require('mongoose');

const { Schema } = mongoose;

const postSchema = new Schema({
  author: { type: String, required: true },
  text: { type: String, required: true },
  appropriate: { type: Boolean, required: true }
});

module.exports = mongoose.model('Post', postSchema);
