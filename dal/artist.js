var Artist = require('../models/artist');

// Create Artist
exports.create = function createArtist(data, cb){
    Artist.create(data, cb);
};

// Get Artist
exports.get = function getArtist(query, cb){

    // populate musics and albums in getArtist Detail View
    Artist.findOne(query,cb)
    .populate([
                {   
                    path: 'musics', 
    	            model: 'Music' 
    	       },

               {
                    path: 'albums',
                    model: 'Album'

                    } 
                ]);
};

// Update Artist
exports.update = function updateArtist(id, data, cb){
    Artist.findByIdAndUpdate(id, data, cb);
};

// Delete Artist
exports.remove = function removeArtist(id, cb){
    Artist.findByIdAndRemove(id, cb);
};

// Get a collection of Artists
exports.getCollection = function getArtistCollection(query, cb){
    Artist.find(query, cb);
};
