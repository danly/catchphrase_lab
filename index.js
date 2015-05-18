var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var _ = require("underscore");

var app = express();
// var db = require("./models");

// // serve js & css files into a public folder
app.use(express.static(__dirname + '/public'));

//body parser config
app.use(bodyParser.urlencoded({ extended: true }));


// //pre-seeded words data
var words = [
	{id: 0, name: "coercion", definition: "forced compliance"},
	{id: 1, name: "recursion", definition: "recursion"},
];


//root path
app.get('/', function (req, res) {
	var homePath = path.join(__dirname + '/public/views/index.html');
	res.sendFile(homePath);
});

// // mongoose .get
// app.get("/todos", function (req, res) {
// 	db.Word.find({},
// 		function (err, words){
// 			res.send(words);
// 	});
// });


// // old .get
app.get("/words", function (req, res) {
	// render foods index as JSON
	res.send(JSON.stringify(words));
});


// // mongoose .post
// app.post("/words", function (req, res) {
// 	db.Word.create(req.body.word,
// 		function (err, word) {
// 			res.send(201, word);
// 		});
// });

// old .post
app.post("/words", function (req, res) {
	// find new word in the req.body
	var newWord = req.body;
	// grab the highest id, increment by 1 and set as the new word's id
	if(words.length === 0){
		newWord.id = 0;
	} else {
		newWord.id = words[words.length-1].id +1;
	}
	// add to our food array
	words.push(newWord);
	// render the created object as json
	res.send(JSON.stringify(newWord));
})


// // mongo .delete
// app.delete("/words/:id", function (req, res) {
// 	db.Word.findAndRemove({
// 		_id: req.params.id
// 	}, function(err, todo) {
// 		res.send(204)
// 	});
// });





// app.delete("/words", function (req, res){
// 	// set the value of the id
// 	var targetId = parseInt(req.query.id, 10);
// 	console.log(targetId, "targetId");
// 	// find item in the array matching the id
// 	var targetItem = _.findWhere(words, {id: targetId});
// 	console.log(targetItem, "targetItem");
// 	// get the index of the found item
// 	var index = words.indexOf(targetItem);
// 	console.log(index, "index")
// 	// remove the item at that index, only remove 1 item
// 	words.splice(index, 1);
// 	res.send(JSON.stringify(targetItem));
// })



app.delete("/words/:id", function (req, res){
	var targetId = parseInt(req.params.id, 10);
	var targetItem = _.findWhere(words, {id: targetId})
	var index = words.indexOf(targetItem);
	words.splice(index, 1);
	res.send(JSON.stringify(targetItem));
})

app.listen(3000, function () {
	console.log("listening on port 3000");
});