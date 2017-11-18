var _		= require('lodash');
var waterfall   = require('async').waterfall;

var ArtistDal  = require('../dal/artist');
var MusicDal    = require('../dal/music');
var AlbumDal   = require('../dal/album');

// POST or Create a Music --- /musics/
exports.createMusic = function createMusic(req, res, next){

	var body        = req.body;


	// Use async.waterfall

	waterfall([function(callback) {

	MusicDal.create(body, function createMusicCB(err, music){
        	if(err){
				res.status(500);
				res.json({
					status: 500,
					type: 'CREATE_MUSIC_ERROR',
					message: err.message
				});
				return;
	        }

	        callback(null, music);

           });

	},  function(music, callback) {


		/* After the music is created it will automatically 
         * find the Artist and update the Artist's Music        
         */
    ArtistDal.get({_id : music.artist}, function getAtrist(err, artist){
        if(err){
             res.status(500);
             res.json({
                 status: 500,
                 type: 'GET_ARTIST_ERROR',
                 message: err.message
             });
             return;  
        }

        var musics = artist.musics;
        musics.push(music._id);
        var musicUpdate = { 'musics' :  musics};


        // Update the Artist's Music
        ArtistDal.update({_id : artist._id}, musicUpdate, function updateArtist(err, artist){
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
            res.json(music)
        });

    });    


	}], function(err, result) {
		if(err) {
			return console.log(err);
		} else {
			console.log("Successfully Created");
		}
	}

)};

// GET Musics --- musics/
exports.getMusics = function getMusics(req, res, next){
	
	MusicDal.getCollection({}, function cbGet(err, musics){

		if(err){
			res.status(500);
			res.json({
				status: 500,
				type: 'GET_MUSICS_ERROR',
				message: err.message
			});
			return;
		}

		res.status(404);
		res.json(musics || {message: "No Music Found"});

	});

};

// GET a Specific Music --- /musics/:musicId
exports.getMusic = function getMusic(req, res, next){
	var musicId = req.params.musicId;
	
	MusicDal.get({_id: musicId}, function cbGet(err, music) {
		if(err){
			res.status(500);
			res.json({
				status: 500,
				type: 'GET_MUSIC_ERROR',
				message: err.message
			});
			return;
		}

		res.status(404);
		res.json(music || {message: "There is no music with this ID" } );
		
   });

};

// PUT or Update a specific Music --- /musics/:musicId
exports.updateMusic = function updateMusic(req, res, next){
	
	var musicId = req.params.musicId;
	var body = req.body;
	
	MusicDal.update({_id : musicId}, body, function cbUpdate(err, music){

		if(err){
			res.status(500);
			res.json({
				status: 500,
				type: 'UPDATE_MUSIC_ERROR',
				message: err.message
			});
			return;
		}

		res.status(404);
		res.json(music || {message: "Can not Update Music"} );
	});
};

// DELETE or Remove a specific Music --- musics/:musicId
exports.removeMusic = function removeMusic(req, res, next){
	var musicId = req.params.musicId;

	// Option 2: Remove the artist and albums Music associated with this ID
	
	MusicDal.remove({_id : musicId}, function cbRemove(err, music){
		
				if(err){
					res.status(500);
					res.json({
						status: 500,
						type: 'REMOVE_MUSIC_ERROR',
						message: err.message
					});
					return;
				}

				res.status(404);
				res.json(music || {message: "Can not Remove Music"} );
			});
	
};



