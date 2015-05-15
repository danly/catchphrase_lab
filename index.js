var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var _ = require("underscore");

var app = express();

// // serve js & css files into a public folder
app.use(express.static(__dirname + '/public'));

//body parser config
app.use(bodyParser.urlencoded({ extended: true }));


//pre-seeded words data
var words = [
	{id: 0, name: "coercion", definition: "forced compliance"},
	{id: 1, name: "recursion", definition: "recursion"},
];
//root path
app.get('/', function (req, res) {
	var homePath = path.join(__dirname + '/public/views/index.html');
	res.sendFile(homePath);
});

app.get("/words", function (req, res) {
	// render foods index as JSON
	res.send(JSON.stringify(words));
});

app.post("/words", function (req, res) {
	// find new word in the req.body
	var newWord = req.body;
	// grab the highest id, increment by 1 and set as the new word's id
	newWord.id = words[words.length-1].id +1;
	// add to our food array
	words.push(newWord);
	// render the created object as json
	res.send(JSON.stringify(newWord));
})

app.delete("/words", function (req, res){
	// set the value of the id
	var targetId = parseInt(req.params.id, 10);
	// find item in the array matching the id
	var targetItem = _.findWhere(words, {id: targetId});
	// get the index of the found item
	var index = words.indexOf(targetItem);
	// remove the item at that index, only remove 1 item
	words.splice(index, 1);
	res.send(JSON.stringify(targetItem));
})

app.listen(3000, function () {
	console.log("listening on port 3000");
});