$(function(){
	Word.all();
})

function View() {};
View.render = function(items, parentId, templateId) {
  var template = _.template($("#" + templateId).html());
  $("#" + parentId).html(template({collection: items}));
};

View.init = function() {
	$("new-word-form").on("submit", function(event){
		event.preventDefault();
		$.post("/words", $(this).serialize()).done(function(res){
			Word.all();
			$("new-word-form")[0].reset();
		});
	});
	//delete feature here
	$("button").on("click", function(){
		Word.delete(this);
	})
};




function Word () {};
Word.all = function(){
	$.get("/words", function(res){
		var words = JSON.parse(res);
		View.render(words, "word-ul", "words-template")
	}).done(function(res){
		View.init();
	});
};

Word.delete = function(context) {
	var id = $(context).data("id");
}