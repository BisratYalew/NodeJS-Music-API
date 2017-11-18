// Load Module Dependencies

module.exports = function logger(opts) {

	return function middleware(req, res, next) {
		console.log(req.method, ' -- ', req.originalUrl);

		next();
	}
};