$(".play-voice").click(function(e) {
    $.ajax({
        url: "/playNotes",
        method: 'POST',
        data: {
            'id': e.target.id
        },
        success: function(result) {
            console.log('done')
            console.log(result)
        }
    });
});

const synth = window.speechSynthesis
let voices = []
const voiceSelect = document.getElementById('voice-select')
const settingForm = document.getElementById('setting-form')
const rate = document.getElementById('rate')
const rateValueLabel = document.getElementById('rate-value')
const pitch = document.getElementById('pitch')
const pitchValueLabel = document.getElementById('pitch-value')

let playButton =  document.getElementsByClassName('play')
let stopButton =  document.getElementsByClassName('stop')
let pauseButton =  document.getElementsByClassName('pause')

window.onload = (function() {
    return function() {
        voices = synth.getVoices()
        voices.forEach(voice => {
            const option = document.createElement('option')
            option.textContent = voice.name + '(' + voice.lang + ')'
            option.setAttribute('data-lang', voice.lang)
            option.setAttribute('data-name', voice.name)
            voiceSelect.appendChild(option)
        })
        if (synth.onvoicechanged !== undefined) {
            synth.onvoicechanged = getVoices;
        }
    }
})()

const speak = (noteTitle,noteContent) => {
	if(synth.speaking){
		console.error("Already speaking")
		return
	}
	if (noteContent !== '') {
		let intro = "";
		if(noteTitle !== '')
			intro = "This note is about "+noteTitle+'<silence msec="1000" />'

		const speakText = new SpeechSynthesisUtterance(intro+noteContent)
		speakText.onend = e=> {
			console.log("Done speaking")
		}
		speakText.onerror = e=>{
			console.error("Something went wrong")
		}

		const selectedVoice = voiceSelect.selectedOptions[0].getAttribute('data-name')

		voices.forEach(voice =>{
			if (voice.name === selectedVoice) {
				speakText.voice = voice
			}
		})

		speakText.rate = rate.value
		speakText.pitch = pitch.value

		synth.speak(speakText)

	}
}

const deactivateButton = (className,ignoreClassName)=>{

	console.log(('button.'+className+'.'+ignoreClassName))
	document.querySelectorAll('button.'+className).forEach(elem => {
    		elem.disabled = true;
	});
	document.querySelectorAll('button.'+className+'.'+ignoreClassName).forEach(elem => {
    		elem.disabled = false;
	});

}
for (var i = 0; i < playButton.length; i++) {
	playButton[i].addEventListener('click',e=>{
	e.preventDefault()
	if(synth.paused){
		synth.resume()
	}else{
	let className = e.target.classList[e.target.classList.length-1]
	deactivateButton('pause',className)
	deactivateButton('stop',className)

	let noteTitle = document.getElementsByClassName(className)[0].textContent
	let noteContent = document.getElementsByClassName(className)[1].textContent
	speak(noteTitle,noteContent)
	}
})
}
for (var i = 0; i < pauseButton.length; i++) {
	pauseButton[i].addEventListener('click',e=>{
	e.preventDefault()
    if(synth.speaking && !synth.paused){
        synth.pause();
    }
})
}
for (var i = 0; i < stopButton.length; i++) {
	stopButton[i].addEventListener('click',e=>{
	e.preventDefault()
    if(synth.speaking){
        synth.cancel();
    }
})
}



rate.addEventListener('click',e=>rateValueLabel.textContent = rate.value)
pitch.addEventListener('click',e=>pitchValueLabel.textContent = pitch.value)
// voiceSelect.addEventListener('change',e=>speak())