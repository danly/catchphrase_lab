$(function(){
	Word.all();
})

function View() {};
View.render = function(items, parentId, templateId) {
  var template = _.template($("#" + templateId).html());
  $("#" + parentId).html(template({collection: items}));
};


function Word () {};
Word.all = function(){
	$.get("/words", function(res){
		var words = JSON.parse(res);
		View.render(foods, )
	})
}