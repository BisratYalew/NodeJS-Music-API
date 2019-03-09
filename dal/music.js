var Music = require('../models/music');


// Create a Music
exports.create = (data, cb) => {
    Music.create(data, cb);
};

// Get a Music
exports.get = (query, cb) => {
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
exports.update = (id, data, cb) => {
    Music.findByIdAndUpdate(id, data, cb);
};

// Delete a Music
exports.remove = (id, cb) => {
    Music.findByIdAndRemove(id, cb);
};

// Get Music Collections
exports.getCollection = (query, cb) => {
    Music.find(query, cb);
};