var Promise = require('bluebird');
var express = require('express');
var router = express.Router();
var models = require('../models');
var mongoose = require('mongoose');

var scrapeReddit = require('../scrapers/scrapeReddit');

var Library = Promise.promisifyAll(models.Library);
var Api = Promise.promisifyAll(models.Api);

router.get('/themes', function(req, res, next){
	scrapeReddit().then(function(subreddit){
		res.json(subreddit);
	}).catch(function(e){
		next(new Error(e));
	});
});

router.get('/libraries', function(req, res, next){
	Library.distinct('groupName').then(function(libraryArr){
		res.json(libraryArr);
	}).catch(function(e){
		next(new Error(e));
	});
});

router.get('/apis', function(req, res, next){
	Api.distinct('groupName').then(function(apiArr){
		res.json(apiArr);
	}).catch(function(e){
		next(new Error(e));
	});
});


router.get('/library', function(req, res, next){
	var type = req.query.type;
	Library.find({groupName : type}).then(function(libraryArr){
		res.json(libraryArr);
	}).catch(function(e){
		next(new Error(e));
	});
});


router.get('/api', function(req, res, next){
	var type = req.query.type;
	Api.find({groupName : type}).then(function(apiArr){
		res.json(apiArr);
	}).catch(function(e){
		next(new Error(e));
	});
});

router.get('/library/:name', function(req, res, next){
	var name = req.params.name;

	if(name == 'random'){
		Library.findRandom().then(function(randomDoc){
			var obj = {collection : 'library'};
			obj.data = randomDoc;
			res.json(obj);
		}).catch(function(err){
			return next(err);
		});
	}
	
});

router.get('/api/:name', function(req, res, next){
	var name = req.params.name;
	
	if(name == 'random'){
		Api.findRandom().then(function(randomDoc){
			var obj = {collection : 'api'};
			obj.data = randomDoc;
			res.json(obj);
		}).catch(function(err){
			return next(err);
		});
	}
});

module.exports = router;