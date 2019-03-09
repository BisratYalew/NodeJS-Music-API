// Logger Middleware Function
module.exports = (opts) => {

	return (req, res, next) => {
		console.log(req.method, ' --> ', req.originalUrl);
		next();
	}
};
