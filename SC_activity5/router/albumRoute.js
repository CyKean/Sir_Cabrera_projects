const express = require('express');
const router = express.Router();
const albumController = require('../controller/albumController');

router.post('/albums/create', albumController.createAlbum);
router.post('/albums/:albumId/songs', albumController.addSongToAlbum);
router.post('/albums/:albumId/songs/:songId/delete', albumController.removeSongFromAlbum);
router.post('/album/edit/:albumId', albumController.editAlbumName);
router.post('/albums/:id', albumController.deleteAlbum);
router.get('/albums', albumController.getAllAlbums); 
router.get('/album/details/:albumId', albumController.getAlbumDetails);

module.exports = router;
