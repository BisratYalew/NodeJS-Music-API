var mongoose = require('mongoose');

// Artist Schema
var ArtistSchema = new mongoose.Schema({
    fname: 			{ type: String, required: true },
	lname:  		{ type: String, required: true },
	date_created: 	{ type : Date },
	last_modified: 	{ type: Date },
	nationality: 	{ type: String, required: true },
	musics:   		[{ type: mongoose.Schema.Types.ObjectId, ref: 'Music' }],
	albums: 		[{ type: mongoose.Schema.Types.ObjectId, ref: 'Album' }]
	
}, {timestamps: { createdAt: 'date_created', updatedAt: 'last_modified' } });

//Export Artist Schema
module.exports = mongoose.model('Artist', ArtistSchema);