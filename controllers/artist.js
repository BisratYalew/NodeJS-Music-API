// Load Module Dependencies

var ArtistDal 	= require('../dal/artist');
 
// POST Artist --- artists/
exports.createArtist =  (req, res, next) => {
	var body = req.body;

	ArtistDal.create(body,  (err, artist) => {
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
exports.getArtists =  (req, res, next) => {
	
	ArtistDal.getCollection({}, (err, artists) => {

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
exports.getArtist = (req, res, next) => {
	var artistId = req.params.artistId;

	ArtistDal.get({_id: artistId}, (err, artist) => {
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
exports.updateArtist =  (req, res, next) => {
	
	var artistId = req.params.artistId;
	var body = req.body;

	ArtistDal.update({_id : artistId}, body,  (err, artist) => {

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
exports.removeArtist =  (req, res, next) => {
	var artistId = req.params.artistId;
	
	ArtistDal.remove({_id : artistId}, (err, artist) => {
		
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