var	express = require('express'),
	app = express(),
	handlebars = require('handlebars'),
	morgan = require('morgan'),
	routes = require('./routes/');

var PORT_NUMBER = 3000;
var SERVER_URL = "localhost";

app.engine('html', handlebars.compile);
app.set('views engine', 'html');
app.set('views', __dirname + '/views');

app.use(morgan('dev'));
app.use(express.static(__dirname + '/static'));
app.use('/', routes);

app.listen(PORT_NUMBER);
console.log('Server is listening at ' + SERVER_URL + ':' + PORT_NUMBER + '...');