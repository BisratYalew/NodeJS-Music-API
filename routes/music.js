var express = require('express');

var musicController = require('../controllers/music');

var router = express.Router();


// Authors Endpoints

// POST Authors
router.post('/', musicController.createMusic);

// GET /Musics/
router.get('/', musicController.getMusics);

// GET musics/:MusicId
router.get('/:musicId', musicController.getMusic);

// PUT musics/:musicId
router.put('/:musicId', musicController.updateMusic);

// DELETE /musics/:musicId
router.delete('/:musicId', musicController.removeMusic);

module.exports = router;