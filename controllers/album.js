var waterfall   = require('async').waterfall;

var ArtistDal   = require('../dal/artist');
var MusicDal    = require('../dal/music');
var AlbumDal    = require('../dal/album');


// POST Albums --- /albums
exports.createAlbum = (req, res, next) => {

	var body           = req.body;

	// Fix cb hell issue
	// Use async.waterfall

	waterfall([function(callback) {

		AlbumDal.create(body,  (err, album) => {
				if(err){
					res.status(500);
					res.json({
						status: 500,
						type: 'CREATE_AlBUM_ERROR',
						message: err.message
					});
					return;
				}

				callback(null, album);

			});

	},  (album, callback) => {


		/* After the music is created it will automatically 
		* find the Artist and update the Artist's Music        
		*/
		ArtistDal.get({_id : album.artist},  (err, artist) => {
			if(err){
				res.status(500);
				res.json({
					status: 500,
					type: 'GET_ARTIST_ERROR',
					message: err.message
				});
				return;  
			}

			var albums = artist.albums;
			albums.push(album._id);
			var albumUpdate = { 'albums' :  albums};


			// Update the Artist's Music
			ArtistDal.update({_id : artist._id}, albumUpdate,  (err, artist) => {
				if(err){
					res.status(500);
					res.json({
						status: 500,
						type: 'UPDATE_ARTIST_ERROR',
						message: err.message
					});
					return;  
				}
				
			});
		}); 


		MusicDal.get({_id : album.musics},  (err, music) => {
			if(err){
				res.status(500);
				res.json({
					status: 500,
					type: 'GET_MUSIC_ERROR',
					message: err.message
				});
				return;  
			}

			var albumM = music.album;
			albumM.push(album._id);
			var albumMUpdate = { 'album' :  albumM };


			// Update the Artist's Music
			MusicDal.update({_id : music._id}, albumMUpdate,  (err, music) => {
				if(err){
					res.status(500);
					res.json({
						status: 500,
						type: 'UPDATE_ARTIST_ERROR',
						message: err.message
					});
					return;  
				}
				res.status(201); 
				res.json(album);    
				
			});
		}); 

	}], (err, album) => {
		if(err) {
			return console.log(err);
		} else {
			// Do some tasks
		}
	}

)};


       
// GET Albums --- /albums
exports.getAlbums = (req, res, next) => {
	
	AlbumDal.getCollection({},  (err, albums) => {

		if(err){
			res.status(500);
			res.json({
				status: 500,
				type: 'GET_ALBUMS_ERROR',
				message: err.message
			});
			return;
		}
		
		res.json(albums || {message: "No Albums Found / Exist"});

	});

};




// GET a Specific Album --- albums/:albumId
exports.getAlbum =  (req, res, next) => {
	var albumId = req.params.albumId;
	
	AlbumDal.get({_id: albumId},  (err, album) => {
		if(err){
			res.status(500);
			res.json({
				status: 500,
				type: 'GET_ALBUM_ERROR',
				message: err.message
			});
			return;
		}
		res.status(404);
		res.json(album || {message: "There is no Album with this ID" } );
		
   });

};

// PUT or Update a specific Album --- albums/:albumId
exports.updateAlbum =  (req, res, next) => {
	
	var albumId = req.params.albumId;
	var body = req.body;

	AlbumDal.update({_id : albumId}, body,  (err, album) => {

		if(err){
			res.status(304);
			res.json({
				status: 304,
				type: 'UPDATE_ALBUM_ERROR',
				message: err.message
			});
			return;
		}
		res.status(404);
		res.json(album || {message: "Can not update Album"} );
	});
};

// DELETE or remove a specific album --- albums/:albumId
exports.removeAlbum =  (req, res, next) => {
	var albumId = req.params.albumId;
	
	AlbumDal.remove({_id : albumId},  (err, album) => {
		
		if(err){
			res.status(304);
			res.json({
				status: 304,
				type: 'REMOVE_ALBUM_ERROR',
				message: err.message
			});
			return;
		}

		res.status(404);
		res.json(album || { message: "Can not remove this Album"});

	});
};