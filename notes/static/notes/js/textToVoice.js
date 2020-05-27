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

const synth = window.speechSynthesis
let voices = []
const voiceSelect = document.getElementById('voice-select')
const getVoices = ()=> {
	voices = synth.getVoices()
	console.log(voices)
	voices.forEach(voice =>{
		const option = document.createElement('option')
		option.textContent = voice.name + '(' + voice.lang +')'
		option.setAttribute('data-lang',voice.lang)
		option.setAttribute('data-name',voice.name)
		voiceSelect.appendChild(option)
		console.log('here')
	})

}
getVoices()

if(synth.onvoicechanged !== undefined){
	synth.onvoicechanged = getVoices;
}

})