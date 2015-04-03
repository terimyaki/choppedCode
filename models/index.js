var mongoose = require('mongoose');
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
	dateCreated: {type: Date, default: Date.now},
	dateEnded: {type: Date, required: true},
	apiCriteria : [{type: Schema.Types.ObjectId, ref: 'Api'}],
	libraryCriteria : [{type: Schema.Types.ObjectId, ref: 'Library'}],
	judges : [{type: Schema.Types.ObjectId, ref: 'User'}],
	participants : [{type: Schema.Types.ObjectId, ref: 'User', required: true}],
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