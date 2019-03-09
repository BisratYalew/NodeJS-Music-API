var mongoose = require('mongoose');

// Music Schema
var MusicSchema = new mongoose.Schema({
    title: 	        { type: String, required: true },
    artist:         [{ type: mongoose.Schema.Types.ObjectId, default: 'Unknown Artist', ref: 'Artist' }],
    album:          [{ type: mongoose.Schema.Types.ObjectId, default: 'Unknown Album', ref: 'Album' }],
    date_created:   { type: Date },
    last_modified:  { type: Date },
    role:           { type: String, default: 'readWrite' }

}, {timestamps: { createdAt: 'date_created', updatedAt: 'last_modified' } });

// Export Music Schema
module.exports = mongoose.model('Music', MusicSchema);
