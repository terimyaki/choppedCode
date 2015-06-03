var Promise = require('bluebird');
var mongoose = Promise.promisifyAll(require('mongoose'));

mongoose.connect('mongodb://localhost/choppedCode');
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));

var Schema = mongoose.Schema;

var commentSchema = new Schema({
	user: {type: Schema.Types.ObjectId, ref: 'User'},
	title: {type: String, required: true},
	body: String
});

var apiSchema = new Schema({
	name : {type: String, required: true},
	link : {type: String, required: true}, 
	description : {type: String},
	groupName : {type: String}
});

var librarySchema = new Schema({
	name : {type: String, required: true},
	link : {type: String, required: true},
	description : {type: String},
	groupName : {type: String},
	groupLink : {type: String}
});

var matchSchema = new Schema({
	name : {type: String, required: true},
	description :{type:String, required:true},
	dateCreated: {type: Date, default: Date.now},
	dateStart: {type:Date},
	dateEnded: {type: Date, required: true},
	theme: Object,
	apiCriteria : [{type: Schema.Types.ObjectId, ref: 'Api'}],
	libraryCriteria : [{type: Schema.Types.ObjectId, ref: 'Library'}],
	judges : [{type: Schema.Types.ObjectId, ref: 'User'}],
	participants : [{type: Schema.Types.ObjectId, ref: 'User'}],
	submissions: [{type: Schema.Types.ObjectId, ref: 'Submission'}],
	winner : [{type: Schema.Types.ObjectId, ref: 'User'}]
});

var userSchema = new Schema({
	name: {type: String, required: true},
	submissions: [{type: Schema.Types.ObjectId, ref: 'Submission'}],
	favorites: [{type: Schema.Types.ObjectId, ref: 'Submission'}]
});

var submissionSchema = new Schema({
	dateCreated: {type: Date, default: Date.now },
	user: {type: Schema.Types.ObjectId, ref: 'User'},
	match: {type: Schema.Types.ObjectId, ref: 'Match'},
	comments: [commentSchema],
	meta: {
		votes: Number,
		favs: Number
	}
});

apiSchema.statics.findRandom = function(callback){
	var self = this;
	return this.find().count().then(function(count){
		return Math.floor(Math.random() * count);
	})
	.then(function(random){
		return self.find()
					.skip(random)
					.limit(-1)
					.then(function(data){
						return data[0];
					});
	})
	.catch(function(err){
		throw new Error(err);
	});
};

librarySchema.statics.findRandom = function(callback){
	var self = this;
	return this.find().count().then(function(count){
		return Math.floor(Math.random() * count);
	})
	.then(function(random){
		return self.find()
				.skip(random)
				.limit(-1)
				.then(function(data){
					return data[0];
				});
	})
	.catch(function(err){
		throw new Error(err);
	});
};

var api = mongoose.model('Api', apiSchema);
var library = mongoose.model('Library', librarySchema);
var match = mongoose.model('Match', matchSchema);
var user = mongoose.model('User', userSchema);
var submission = mongoose.model('Submission', submissionSchema);

module.exports = {
	Api : api,
	Library : library,
	Match : match,
	User : user,
	Submission: submission
};