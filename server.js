var	express = require('express'),
	app = express(),
	path = require('path'),
	morgan = require('morgan'),
	bodyparser = require('body-parser');
	
var routes = require('./routes/'),
	matchRoutes = require('./routes/match');

var PORT_NUMBER = 3000;
var SERVER_URL = "localhost";

app.set('port', (process.env.PORT || PORT_NUMBER));

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static(path.join(__dirname,'/bower_components')));

app.use(bodyparser.json());
app.use(bodyparser.urlencoded());

app.get("/", function(req, res){
	res.sendFile(path.join(__dirname,'/index.html'));
});

app.use('/', routes);
app.use('/match', matchRoutes);

app.use(function (req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

app.use(function (err, req, res, next) {
	err.status = err.status || 500;
	res.json(err);
});

app.listen(app.get('port'), function(){
	console.log('Server is listening at ' + SERVER_URL + ':' + app.get('port') + '...');
});