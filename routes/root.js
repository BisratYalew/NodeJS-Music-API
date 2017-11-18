// Defined CRUD Operations
app.get('/', function getRoot(req, res){
	res.json({
		message: 'NY Times is going Live!!!'
	})
});