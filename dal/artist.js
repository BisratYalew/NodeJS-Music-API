var Artist = require('../models/artist');

// Create Artist
exports.create = (data, cb) => {
    Artist.create(data, cb);
};

// Get Artist
exports.get = (query, cb) => {

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
exports.update = (id, data, cb) => {
    Artist.findByIdAndUpdate(id, data, cb);
};

// Delete Artist
exports.remove = (id, cb) => {
    Artist.findByIdAndRemove(id, cb);
};

// Get a collection of Artists
exports.getCollection = (query, cb) => {
    Artist.find(query, cb);
};
