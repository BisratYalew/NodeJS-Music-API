var Music = require('../models/music');


// Create a Music
exports.create = function createMusic(data, cb){
    Music.create(data, cb);
};

// Get a Music
exports.get = function getMusic(query, cb) {
    Music.findOne(query,cb)
    .populate([

    	      { path: 'artist', 
    	        model: 'Artist'
  				    		   
  			  },

  			  {
                path: 'album',
                model: 'Album'
  			  } 
    	    ]);    
};

// Update a Music
exports.update = function updateMusic(id, data, cb){
    Music.findByIdAndUpdate(id, data, cb);
};

// Delete a Music
exports.remove = function removeMusic(id, cb){
    Music.findByIdAndRemove(id, cb);
};

// Get Music Collections
exports.getCollection = function getMusicCollection(query, cb){
    Music.find(query, cb);
};