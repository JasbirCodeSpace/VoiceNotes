$(function () {
// $("#create-note").modalForm({formURL: "{% url 'notes/create-note' %}", modalID: "#create-modal"});
$('.edit-note-button').on('click',function(){
	$.ajax({
		url : $(this).attr('data-url'),
		method:'GET',
		success:function(data){
			$('#edit-note-modal-outer-div').html(data)
			$('#edit-note').modal()
		}

	})
})

$('.delete-note-button').on('click',function(){

	$.ajax({
		url : $(this).attr('data-url'),
		method: 'GET',
		success: function(data){
			$('#delete-note-modal-outer-div').html(data)
			$('#delete-note').modal()
		}
	})
})
});