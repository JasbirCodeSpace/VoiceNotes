$(document).ready(function(){
$(".play-voice").click(function(e){
  $.ajax({
  	url: "/playNotes",
  	method:'POST',
  	data:{'id':e.target.id},
  	success: function(result){
  		console.log('done')
  		console.log(result)
  }});
});
})