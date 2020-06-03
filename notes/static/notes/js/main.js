$(function () {
// $("#create-note").modalForm({formURL: "{% url 'notes/create-note' %}", modalID: "#create-modal"});
$('.edit-note-button').on('click',function(){
	$.ajax({
		url : $(this).attr('data-url'),
		method:'GET',
		success:function(data){
			$('#edit-note-modal-outer-div').html(data)
			$('#edit-note').modal()
			$('#edit-note').on('hidden.bs.modal', function () { 
			    if(synth.speaking){
			    	synth.cancel()
			    }
			});
			let text = $('#edit-note').find('.modal-title').text().trim()
			speak('',text)
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
			$('#delete-note').on('hidden.bs.modal', function () { 
			    if(synth.speaking){
			    	synth.cancel()
			    }
			});

			let text = $('#delete-note').find('.modal-body').text().trim()
			speak('',text)
		}
	})
})
});