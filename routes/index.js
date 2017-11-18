// Load Module Dependencies

var artistRouter   = require('./artist');
var musicRouter    = require('./music');
var albumRouter    = require('./album');

module.exports = function appRouter(app) {

	// Authors Routes
	app.use('/artists', artistRouter);

	// Articles Routes
    app.use('/musics', musicRouter);

    // Albums Routes
    app.use('/albums', albumRouter);

	
}