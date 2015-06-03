var Promise = require('bluebird');
var express = require('express');
var mongoose = Promise.promisifyAll(require('mongoose'));

var models = require('../models/');
var Library = models.Library;
var Api = models.Api;
var Match = models.Match;

var router = express.Router();



router.get('/', function(req, res){
	console.log(req.params);
	Match.find().then(function(data){
		res.json(data);
	}).catch(function(err){
		throw new Error(err);
	});
});

router.post('/', function(req, res){
	var newMatch = {
		name : req.body.name,
		description : req.body.description,
		dateStart : req.body.dateStart,
		dateEnded : req.body.dateEnded,
		theme : req.body.theme,
		apiCriteria : [],
		libraryCriteria : []
	};
	req.body.criterias.forEach(function(el){
		if(el.collection == 'library'){
			newMatch.libraryCriteria.push(el.data._id);
		} else {
			newMatch.apiCriteria.push(el.data._id);
		}
	});

	Match.create(newMatch).then(function(match){
		res.json(match);
	}, function(err){
		return next(err);
	});
});

router.get('/:id', function(req, res){
	var id = req.params.id;
	Match.findOne(id)
			.populate('libraryCriteria')
			.populate('apiCriteria')
			.then(function(data){
				res.json(data);
			}).catch(function(err){
				throw new Error(err);
			});
});

router.put('/:id', function(req, res){
	var id = req.params.id;
});

router.delete('/:id', function(req, res){
	var id = req.params.id;
	Match.findOneAndRemove(id).then(function(data){
		res.json(data);
	}).catch(function(err){
		throw new Error(err);
	});
});

module.exports = router;