const express = require('express');
const router = express.Router();
const Controller = require('../controller/Controller')

router.get('/', Controller.home)
router.get('/playlists', Controller.getPlaylist)
router.get('/playlist_details/:id', Controller.getPlaylistDetails)
router.get('/playlists/:id/delete', Controller.deletePlaylist);

router.post('/add_music', Controller.addMusic)
router.post('/createPlaylist', Controller.createPlaylist)
router.post('/playlists/:id/add-song', Controller.addSongToPlaylist);
router.post('/playlists/:id/edit', Controller.updatePlaylistName)
router.post('/playlists/:id/remove-song', Controller.removeSongFromPlaylist)
router.post('/songs/:id/edit', Controller.editSong)

module.exports = router