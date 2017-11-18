// Load Module Dependencies
var express = require('express');

var albumController = require('../controllers/album');

var router = express.Router();


// Authors Endpoints

// POST albums/
router.post('/', albumController.createAlbum);

// GET albums/
router.get('/', albumController.getAlbums);

// GET a Specific Album --- albums/:albumId
router.get('/:albumId', albumController.getAlbum);

// PUT or Update a Specific Album --- albums/:albumId
router.put('/:albumId', albumController.updateAlbum);

// DELETE a Specific Album --- albums/:albumsId
router.delete('/:albumId', albumController.removeAlbum);

module.exports = router;