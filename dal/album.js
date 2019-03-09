var Album = require('../models/album');


// Create an Album
exports.create = (data, cb) => {
    Album.create(data, cb);
};

// Get an Album
exports.get = (query, cb) => {
    Album.findOne(query,cb)
    .populate([ 

    	      {
				  path: 'artist', 
    	          model: 'Artist' 
    	       },
    	       {
    	       	 path: 'musics',
    	       	 model: 'Music'
    	       }

    	    ]);
};

// Update an Album
exports.update =(id, data, cb) => {
    Album.findByIdAndUpdate(id, data, cb);
};

// Delete an Album
exports.remove = (id, cb) => {
    Album.findByIdAndRemove(id, cb);
};

// Get a collection of Albums
exports.getCollection = (query, cb) => {
    Album.find(query, cb);
};