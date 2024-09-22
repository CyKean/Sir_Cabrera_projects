// models/Song.js
const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
  title: String,
  artist: String,
  album: { type: mongoose.Schema.Types.ObjectId, ref: 'Album' }, // Reference to Album
  duration: Number, // Optional, if you have duration info
  filePath: String, // Path to the song in the music folder
});

const Song = mongoose.model('Song', songSchema);

module.exports = Song;
