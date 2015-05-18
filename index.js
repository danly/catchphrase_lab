var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var _ = require("underscore");

var app = express();
var db = require("./models");

// // serve js & css files into a public folder
app.use(express.static(__dirname + '/public'));

//body parser config
app.use(bodyParser.urlencoded({ extended: true }));



//root path
app.get('/', function (req, res) {
	var homePath = path.join(__dirname + '/public/views/index.html');
	res.sendFile(homePath);
});

// mongoose .get
app.get("/words", function (req, res) {
	db.Word.find({},
		function (err, words){
			res.send(words);
	});
});




// mongoose .post
app.post("/words", function (req, res) {
	// foo = {id: 1, name: 'foo', definition: 'bar'}
	// db.Word.create(foo, function(){ ... })

	db.Word.create(req.body.word, function (err, word) {
		res.send(201, word);
	});
});




// mongo .delete
app.delete("/words/:id", function (req, res) {
	db.Word.findOneAndRemove({
		_id: req.params.id
	}, function(err, todo) {
		res.send(204)
	});
});



app.listen(3000, function () {
	console.log("listening on port 3000");
});