// Load Module Dependencies

var lodash		= require('lodash');

var ArtistDal 	= require('../dal/artist');
var MusicDal    = require('../dal/music');
var AlbumDal   = require('../dal/album');
 
// POST Artist --- artists/
exports.createArtist = function createArtist(req, res, next){
	var body = req.body;

	ArtistDal.create(body, function createCB(err, artist){
		if(err){
			res.status(500);
			res.json({
				status: 500,
				type: 'CREATE_ARTIST_ERROR',
				message: err.message
			});
			return;
		}
		res.status(201);
		res.json(artist);
	});
};

// GET Artists --- artists/
exports.getArtists = function getArtists(req, res, next){
	
	ArtistDal.getCollection({}, function getCB(err, artists){

		if(err){
			res.status(500);
			res.json({
				status: 500,
				type: 'GET_ARTISTS_ERROR',
				message: err.message
			});
			return;
		}
		
		res.json(artists || { message: "Can not get Artists"});

	});

};

// GET A Specific Artist --- artists/:artistId
exports.getArtist = function getArtist(req, res, next){
	var artistId = req.params.artistId;

	ArtistDal.get({_id: artistId}, function getCB(err, artist){
		if(err){
			res.status(500);
			res.json({
				status: 500,
				type: 'GET_ARTIST_ERROR',
				message: err.message
			});
			return;
		}

		res.status(404);
		res.json(artist || { message : "Can not get Artist"} );
	});

};

// PUT or Update a specific Artist --- artists/:artistId
exports.updateArtist = function updateArtist(req, res, next){
	
	var artistId = req.params.artistId;
	var body = req.body;

	ArtistDal.update({_id : artistId}, body, function updateCB(err, artist){

		if(err){
			res.status(500);
			res.json({
				status: 500,
				type: 'UPDATE_ARTIST_ERROR',
				message: err.message
			});
			return;
		}

		res.status(404);
		res.json(artist || { message : "Can not Update Artist"} );
	});
};

// DELETE or Remove a specific artist ... artists/:artistId
exports.removeArtist = function removeArtist(req, res, next){
	var artistId = req.params.artistId;
	
	ArtistDal.remove({_id : artistId}, function removeCB(err, artist){
		
				if(err){
					res.status(500);
					res.json({
						status: 500,
						type: 'REMOVE_ARTIST_ERROR',
						message: err.message
					});
					return;
				}

				res.status(404);
				res.json(artist || { message: "Can not Delete Artist"} );
			});
	
};