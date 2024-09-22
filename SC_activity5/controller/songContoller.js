const Album = require('../models/Album');
const Song = require('../models/Song');

exports.Song = async (req, res) => {
    try {
        const songs = await Song.find(); // Retrieve all songs from MongoDB
        res.render('index', { songs });
      } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving songs');
      }
}