var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var _ = require("underscore");

var app = express();
var views = path.join(process.cwd(), "public/views");

// serve js & css files into a public folder
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));

var words = [
	{id: 0, name: "coercion", definition: "forced compliance"},
	{id: 1, name: "recursion", definition: "recursion"},
];

app.get("/", function (req, res) {
	//render index.html
	var homePath = path.join(views, "index.html");
	res.sendFile(homePath);
});

app.get("/words", function (req, res) {
	res.send(JSON.stringify(words));
});

app.post("/words", function (req, res) {
	var newWord = req.body;
	newWord.id = words[words.length-1].id+1;
	word.push(newWord);
	res.send(newWord);
})

app.delete("/foods/:id", function (req, res) {
	console.log("delete route hit")
})


app.listen(3000, function (req, res) {
	console.log("working!!");
});