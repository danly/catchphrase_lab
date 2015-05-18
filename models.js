var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/catchPhrase_app");

var Schema = mongoose.Schema;

var catchPhraseSchema = new Schema({
	id: {
		type: Number,
		default: ""
	},
	name: {
		type: String,
		default: ""
	},
	definition: {
		type: String,
		default: ""
	}
});

var Word = mongoose.model('Word', catchPhraseSchema);

module.exports.Word = Word;

