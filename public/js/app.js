$(function(){
	Word.all();
	View.init();
})


function View() {};
View.init = function() {
	$("#word-form").on("submit", function(event){
		event.preventDefault();
		var wordParams = $(this).serialize(); //formats from data into a query string
		Word.create(wordParams);
	});

	$(".close").on("click", function(){
		Word.delete(this);
	})

};

View.render = function(items, parentId, templateId) {
	var template = _.template($('#' + templateId).html());
	$('#' + parentId).html(template({collection: items}));
};

function Word () {};
Word.all = function(){
	$.get("/words", function(res){
		// removed JSON.parse() because we removed JSON.stringify on the server side
		var words = res;
		View.render(words, "word-ul", "words-template");
	});
}
Word.create = function(wordParams) {
	$.post("/words", wordParams).done(function(res){
		Word.all();
	}).done(function(res){
		$("#word-form")[0].reset();
	});
};
Word.delete = function(word) {

	var wordId = $(word).data("_id"); //unique mongoose _id
	console.log(wordId, "wordId")

	$.ajax({ 								//READ DOCS FOR THIS
		url: '/words/' + wordId,
		type: 'DELETE',
		success: function(res) {
			Word.all();
		}
	});
};