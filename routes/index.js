var express = require('express');
var routes = express.Router();

routes.get("/", function(req, res){
	res.render('index.html', {title : "Main Page"});
});

module.exports = routes;