const song = require('../models/songModel');

const control = {
    home:(req, res) => {
        song.getAllSongs((err, results)=>{
            if (err) throw err;
            res.render('home', {getAllSongs: results});
        })
    },

    addMusic:(req, res) => {
        const data = req.body;
       
        song.insert(data, (err)=>{
            if (err) throw err;
            res.redirect('/');
        })
    },

    createPlaylist:(req, res) => {
        const data = req.body;
        song.createPlaylist(data, (err)=>{
            if (err) throw err;
            res.redirect('/');
        })
    },

    getPlaylist:(req, res) => {
        song.getPlaylist((err, results)=>{
            if (err) throw err;
            res.render('playlists', {getPlaylist: results});
        })
    },

    getPlaylistDetails:(req, res) => {
        const playlist_id = req.params.id;
        console.log(playlist_id);

        song.getPlaylistDetails(playlist_id, (err, result) => {
            if (err) {
                console.error('Error retrieving playlist details:', err);
                return res.status(500).send('Database Error');
            }
            // Retrieve available songs for the dropdown
            song.getAllSongs((err, songList) => {
                if (err) {
                    console.error('Error retrieving songs:', err);
                    return res.status(500).send('Database Error');
                }
                res.render('playlist_details', {
                    getPlaylistDetails: result,
                    availableSongs: songList // Pass the list of available songs
                });
            });
        });
    },

    displaySongs:(req, res) => {
        song.getAllSongs((err, results)=>{
            if (err) throw err;
            res.render('home', {getAllSongs: results});
        })
    },

    addSongToPlaylist:(req, res) => {
        const playlistId = req.params.id;
        const songId = req.body.song_id;
    
        song.checkSongInPlaylist(playlistId, songId, (err, exists) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error checking song in playlist');
            }
            if (exists) {
                return res.redirect(`/playlist_details/${playlistId}`); // Redirect back to the playlist
            } else {
                song.addSongToPlaylist(playlistId, songId, (err) => {
                    if (err) {
                        console.error(err);
                        return res.status(500).send('Error adding song to playlist');
                    }
                    res.redirect(`/playlist_details/${playlistId}`);
                });
            }
        });
    },

    updatePlaylistName: (req, res) => {
        const  playlistId  = req.params.id;
        const  name  = req.body.new_name;

        song.updatePlaylistName(name, playlistId, (err) => {
            if (err) {
                console.error('Error updating playlist name:', err);
                return res.status(500).send('Database Error');
            }
            res.redirect(`/playlist_details/${playlistId}`);
        });
    },

    removeSongFromPlaylist:(req, res) => {
        const playlist_id = req.params.id;
        const song_id = req.body.song_id;

        song.removeSongFromPlaylist(playlist_id, song_id, (err) => {
            if (err) {
                console.error('Error removing song from playlist:', err);
                return res.status(500).send('Database Error');
            }
            res.redirect(`/playlist_details/${playlist_id}`);
        });
    },

    deletePlaylist:(req, res) => {
        const playlist_id = req.params.id;

        song.deletePlaylist(playlist_id, (err) => {
            if (err) {
                console.error('Error deleting playlist:', err);
                return res.status(500).send('Database Error');
            }
            res.redirect('/playlists');
        });
    },

    editSong:(req, res) => {
        const song_id = req.params.id;
        const { title, artist } = req.body;
        let file_path = req.body.file_path;
    
        // Use the existing file path if no new file is uploaded
        if (!file_path) {
            file_path = req.body.existing_file_path;
        }
    
        // Call the model's update function
        song.editSong(song_id, title, artist, file_path, (err) => {
            if (err) {
                console.error('Error editing song:', err);
                return res.status(500).send('Database Error');
            }
            res.redirect('/');
        });
    },
    
}

module.exports = control