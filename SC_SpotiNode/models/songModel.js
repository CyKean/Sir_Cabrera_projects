const db = require('../db');

const song = {
    insert:(data, callback) => {
        const query = "insert into songs (title, artist, file_path) values (?,?,?)";
        db.query(query, [data.title, data.artist, data.file_path], callback);
    },

    getAllSongs:(callback) => {
        const query = `select * from songs`; // Adjust this based on your table structure
        db.query(query, (err, results) => {
            if (err) {
                return callback(err, null);
            }
            return callback(null, results);
        });
    },

    createPlaylist:(data, callback) => {
        const query = "insert into playlists (name,description) values (?,?)"
        db.query(query, [data.name, data.description], callback);
    },

    getPlaylist:(callback) => {
        const query = "select * from playlists";
        db.query(query, callback);  
    },

    getPlaylistDetails: (playlist_id, callback) => {
        const query = `
            select p.id as playlist_id, p.name, p.description, s.id as song_id, s.title, s.file_path, s.artist
            from playlists p
            left join playlist_songs ps on p.id = ps.playlist_id
            left join songs s on ps.song_id = s.id
            where p.id = ?
        `;
    
        db.query(query, [playlist_id], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            // Log to verify results
            console.log(results);
            return callback(null, results);
        });
    },

    isSongInPlaylist: (playlist_id, song_id, callback) => {
        const query = `select * from playlist_songs where playlist_id = ? and song_id = ?`;
        db.query(query, [playlist_id, song_id], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            return callback(null, results.length > 0); // Return true if the song exists
        });
    },

    checkSongInPlaylist:(playlistId, songId, callback) => {
        const query = 'select * from playlist_songs where playlist_id = ? and song_id = ?';
        db.query(query, [playlistId, songId], (err, results) => {
            if (err) return callback(err);
            callback(null, results.length > 0); // Returns true if the song is already in the playlist
        });
    },
    
    addSongToPlaylist:(playlistId, songId, callback) => {
        const query = 'insert into playlist_songs (playlist_id, song_id) values (?, ?)';
        db.query(query, [playlistId, songId], (err, result) => {
            if (err) return callback(err);
            callback(null, result);
        });
    },

    updatePlaylistName:(name, playlistId, callback) => {
        const query = `update playlists set name = ? where id = ?`;

        db.query(query, [name, playlistId], (err, result) => {
            if (err){
                return callback(err);
            } 
            callback(null, result);
        });
    },
    
    removeSongFromPlaylist:(playlist_id, song_id, callback) => {
            const query = `
            DELETE FROM playlist_songs
            WHERE playlist_id = ? AND song_id = ?
        `;
        
        db.query(query, [playlist_id, song_id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },

    deletePlaylist:(playlist_id, callback) => {
        const deletePlaylistSongsQuery = 'DELETE FROM playlist_songs WHERE playlist_id = ?';
        const deletePlaylistQuery = 'DELETE FROM playlists WHERE id = ?';
    
        db.beginTransaction((transactionErr) => {
            if (transactionErr) {
                return callback(transactionErr);
            }
    
            db.query(deletePlaylistSongsQuery, [playlist_id], (err) => {
                if (err) {
                    return db.rollback(() => callback(err));
                }
    
                db.query(deletePlaylistQuery, [playlist_id], (err, results) => {
                    if (err) {
                        return db.rollback(() => callback(err));
                    }
    
                    db.commit((commitErr) => {
                        if (commitErr) {
                            return db.rollback(() => callback(commitErr));
                        }
                        callback(null, results); 
                    });
                });
            });
        });
    },

    editSong:(song_id, title, artist, file_path, callback) => {
        const getSongQuery = "SELECT * FROM songs WHERE id = ?";
        db.query(getSongQuery, [song_id], (err, results) => {
            if (err) return callback(err);
        
            if (results.length === 0) {
                return callback(new Error('Song not found'));
            }
        
            const existingSong = results[0];

            const newTitle = title || existingSong.title;
            const newArtist = artist || existingSong.artist;
            const newFilePath = file_path || existingSong.file_path;
        
            const updateSongQuery = "UPDATE songs SET title = ?, artist = ?, file_path = ? WHERE id = ?";
            db.query(updateSongQuery, [newTitle, newArtist, newFilePath, song_id], (updateErr, results) => {
                if (updateErr) {
                    return callback(updateErr);
                }
                callback(null, results);
            });
        });
        
    },

};

module.exports = song;