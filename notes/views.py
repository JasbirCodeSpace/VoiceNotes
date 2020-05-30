from django.shortcuts import render
from .models import Note
import os
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse

def home(request):
	context = {
		'notes':Note.objects.all()
	}
	return render(request,'notes/base.html',context)

# @csrf_exempt
# def play_notes(request):
# 	if request.method == 'POST':
# 		noteId = request.POST.get('id')
# 		note = Note.objects.get(id=noteId)
# 		print(note.content)
# 		TTS = gTTS(text=note.content, lang='en-uk')
# 		TTS.save("voice.mp3")
# 		pygame.mixer.init()
# 		pygame.mixer.music.load("voice.mp3")
# 		pygame.mixer.music.play()
# 		return HttpResponse(request,{'status':True})
