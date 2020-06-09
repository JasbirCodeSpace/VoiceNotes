const synth = window.speechSynthesis
let voices = []
const voiceSelect = document.getElementById('voice-select')
const settingForm = document.getElementById('setting-form')

const rate = document.getElementById('rate')
const rateValueLabel = document.getElementById('rate-value')
const pitch = document.getElementById('pitch')
const pitchValueLabel = document.getElementById('pitch-value')
const volume = document.getElementById('volume')
const volumeValueLabel = document.getElementById('volume-value')


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

const speak = (title,content) => {
	if(synth.speaking){
		console.error("Already speaking")
		return
	}
	if (content !== '') {
		let intro = "";
		if(title !== '')
			intro = "This note is about "+title+", "

		const speakText = new SpeechSynthesisUtterance(intro+content)

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
		speakText.volume = ((volume.value)/100).toFixed(2)
		synth.speak(speakText)

	}else{
	}
}

const deactivateButton = (className,ignoreClassName)=>{

	document.querySelectorAll('button.'+className).forEach(elem => {
    		elem.disabled = true;
	});
	document.querySelectorAll('button.'+className+'.'+ignoreClassName).forEach(elem => {
    		elem.disabled = false;
	});

}

const activateButton = (className)=>{
	document.querySelectorAll('button.'+className).forEach(elem=>{
		elem.disabled = false;
	})
}
for (var i = 0; i < playButton.length; i++) {
	playButton[i].addEventListener('click',e=>{
	e.preventDefault()
	if(synth.paused){
		synth.resume()
	}else{
	let className = e.currentTarget.classList[e.currentTarget.classList.length-1]
	deactivateButton('pause',className)
	deactivateButton('stop',className)
	deactivateButton('play',className)

	let title = document.getElementsByClassName(className)[0].textContent
	let content = document.getElementsByClassName(className)[1].textContent
	speak(title,content)
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
        activateButton('pause')
        activateButton('play')
        activateButton('stop')
    }
})
}



rate.addEventListener('click',e=>rateValueLabel.textContent = rate.value)
pitch.addEventListener('click',e=>pitchValueLabel.textContent = pitch.value)
volume.addEventListener('click',e=>volumeValueLabel.textContent = volume.value)
// voiceSelect.addEventListener('change',e=>speak())

// speak when add note modal opens
$('#add_note').on('shown.bs.modal', function () { 
    if(synth.speaking){
    	synth.cancel()
    }
    speak('','Create new note')
});
// close speak when add note modal closes
$('#add_note').on('hidden.bs.modal', function () { 
    if(synth.speaking){
    	synth.cancel()
    }
});
