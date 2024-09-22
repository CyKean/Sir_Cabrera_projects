const Album = require('../models/Album');
const Song = require('../models/Song');

// Create a new album
exports.createAlbum = async (req, res) => {
  const { name } = req.body;

  // try {
    // const newAlbum = new Album({ name, songs: [] });
    // await newAlbum.save();

    // const albums = await Album.find();
    // res.redirect('album', {albums});
  // } 
  // catch (error) {
  //   res.status(500).send('Error creating album');
  // }

  try {
    const newAlbum = new Album({ name, songs: [] });
    await newAlbum.save();

    const albums = await Album.find().populate('songs');
    res.render('album', { albums });
  } catch (error) {
    res.status(500).send('Error fetching albums');
  }
};

// Add a song to an album
exports.addSongToAlbum = async (req, res) => {
    const { albumId } = req.params;
    const { songId } = req.body;

    try {
        // Find the album and populate its songs
        const album = await Album.findById(albumId).populate('songs');
        
        // Retrieve all songs to populate the select options in the front-end
        const allSongs = await Song.find();

        // Check if the song is already in the album
        const songAlreadyInAlbum = album.songs.some(song => song._id.toString() === songId);

        if (songAlreadyInAlbum) {
            // Render the page with a flag indicating that the song already exists in the album
            return res.render('album_details', { album, allSongs, songExists: true });
        }

        // Add the song to the album if not already present
        const song = await Song.findById(songId);
        album.songs.push(song);
        await album.save();

        // Redirect back to the album details page after adding the song
        res.redirect(`/album/details/${albumId}`);
    } catch (error) {
        res.status(500).send('Error adding song to album');
    }
};
  

// Remove a song from an album
exports.removeSongFromAlbum = async (req, res) => {
  const { albumId, songId } = req.params;

  try {
    const album = await Album.findById(albumId);
    const song = await Song.findById(songId);

    if (!album || !song) {
      return res.status(404).send('Album or Song not found');
    }

    album.songs = album.songs.filter(id => id.toString() !== songId);
    song.album = null;
    await album.save();
    await song.save();

    res.redirect(`/album/details/${albumId}`);
  } catch (error) {
    res.status(500).send('Error removing song from album');
  }
};

// Edit album name
exports.editAlbumName = async (req, res) => {
    const { albumId } = req.params;  // Ensure correct param
    const { name } = req.body;
  
    try {
      const album = await Album.findById(albumId).populate('songs'); // Fetch album with songs
  
      if (!album) {
        return res.status(404).send('Album not found');
      }
  
      // Update album name
      album.name = name;
      await album.save();
  
      // Redirect to album_details page with the updated album
      res.render('album_details', { album }); // Pass the updated album to the view
  
    } catch (error) {
      res.status(500).send('Error updating album name');
    }
  };
  

exports.deleteAlbum = async (req, res) => {
    const { id } = req.params;
  
    try {
      await Album.findByIdAndDelete(id); // Delete the album by ID
      res.redirect('/albums'); // Redirect back to the albums page
    } catch (error) {
      res.status(500).send('Error deleting album');
    }
  };
  

exports.getAllAlbums = async (req, res) => {
    try {
      const albums = await Album.find().populate('songs');
      res.render('album', { albums });
    } catch (error) {
      res.status(500).send('Error fetching albums');
    }
  };
  
  exports.getAlbumDetails = async (req, res) => {
    const { albumId } = req.params;
  
    try {
        
      const album = await Album.findById(albumId).populate('songs'); 
      const allSongs = await Song.find({});
      res.render('album_details', { album,  allSongs });
    } catch (error) {
      res.status(500).send('Error fetching album details');
    }
  };
  