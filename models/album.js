var mongoose = require('mongoose');

// Album Schema
var AlbumSchema = new mongoose.Schema({
    album_name: 	{ type: String },
    date_created:   { type: Date },
    last_modified:  { type: Date },
	artist:         [{ type: mongoose.Schema.Types.ObjectId, ref: 'Artist' }],
	musics:         [{ type: mongoose.Schema.Types.ObjectId, ref: 'Music' }],
			
}, {timestamps: { createdAt: 'date_created', updatedAt: 'last_modified' } });

// Export Album Schema
module.exports = mongoose.model('Album', AlbumSchema);