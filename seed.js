var Promise = require('bluebird');
var mongoose = require('mongoose');

var models = require('./models');
var Library = Promise.promisifyAll(models.Library);
var Api = Promise.promisifyAll(models.Api);

var jsData = require('./scrapers/scrapeJavascripting');
var pwData = require('./scrapers/scrapeProgWeb');

mongoose.connection.on('open', function(){
	console.log('I am open');
	mongoose.connection.db.dropDatabase(function(){
		console.log('Dropped old data, now inserting data');

		Promise.all([populateJS(), populatePW()]).then(function(results){
			if(results){
				console.log("Finished inserting data");
				console.log("Control-C to quit");
			}
		}).catch(function(e){
			throw new Error(e);
		});
	});
});

function populateJS(){
	jsData.then(function(jsArr){
		console.log('JS Data is in.');
		jsArr.map(function(el){
			return Library.create(el);
		});

		Promise.all(jsArr).then(function(el){
			console.log('Library DB is all populated.');
			return "done";
		}).catch(function(el){
			throw new Error(e);
		});

	}).catch(function(e){
		throw new Error(e);
	});
}

function populatePW(){
	pwData.then(function(pwArr){
		console.log('PW Data is in.');
		pwArr.map(function(el){
			return Api.create(el);
		});

		Promise.all(pwArr).then(function(el){
			console.log('API DB is all populated.');
			return "done";
		}).catch(function(e){
			throw new Error(e);
		});
	});
}
