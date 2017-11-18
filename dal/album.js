var Album = require('../models/album');


// Create an Album
exports.create = function createAlbum(data, cb){
    Album.create(data, cb);
};

// Get an Album
exports.get = function getAlbum(query, cb) {
    Album.findOne(query,cb)
    .populate([ 

    	      {path: 'artist', 
    	        model: 'Artist' 
    	       },

    	       {
    	       	 path: 'musics',
    	       	 model: 'Music'
    	       }

    	       ]);

    };

// Update an Album
exports.update = function updateAlbum(id, data, cb){
    Album.findByIdAndUpdate(id, data, cb);
};

// Delete an Album
exports.remove = function removeAlbum(id, cb){
    Album.findByIdAndRemove(id, cb);
};

// Get a collection of Albums
exports.getCollection = function getAlbumCollection(query, cb){
    Album.find(query, cb);
};