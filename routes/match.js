var Promise = require('bluebird');
var express = require('express');
var mongoose = Promise.promisifyAll(require('mongoose'));

var models = require('../models/');
var Library = models.Library;
var Api = models.Api;
var Match = models.Match;

var router = express.Router();

router.get('/', function(req, res){
	Match.find().then(function(data){
		res.json(data);
	}).catch(function(err){
		throw new Error(err);
	});
});

router.post('/', function(req, res){
	var body = req.body;
	console.log(req.body);
});

router.get('/:id', function(req, res){
	var id = req.params.id;
	Match.findOne(id).then(function(data){
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