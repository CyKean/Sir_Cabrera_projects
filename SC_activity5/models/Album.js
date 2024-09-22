const mongoose = require('mongoose');

const albumSchema = new mongoose.Schema({
  name: String,
  songs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Song' }] // Array of Song references
});

const Album = mongoose.model('Album', albumSchema);
module.exports = Album;
