var REPL = require("repl");
var db = require("./models");

db.Word.create({
  id: 5,
  name: 'goodbye',
  definition: 'means sayonara'
}, function (err, word) {
  console.log("WORD CREATED");
  console.log(word);
});

var repl = REPL.start("Word > ");
repl.context.db = db;

repl.on("exit", function () {
	console.log("GOODBYE!!!!!!");
	process.exit();
})