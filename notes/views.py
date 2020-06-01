import os
from django.shortcuts import render,redirect
from .models import Note
from django.views.decorators.csrf import csrf_exempt,csrf_protect
from django.http import JsonResponse
from .forms import NoteForm

def home(request):
	if request.user.is_authenticated:
		notes = Note.objects.filter(user=request.user)
		if request.method == "POST":
			form = NoteForm(request.POST)
			if form.is_valid():
				form_data = form.save(commit=False)
				form_data.user = request.user
				form_data.save()
				return redirect('notes-home')
		else:		
			form = NoteForm()

		context ={
			'notes' : notes,
			'new_note_form' : form,
		}
		return render(request,'notes/notes.html',context)
	else:
		return redirect('user-signin')

def create_note(request):
	if request.user.is_authenticated:
		if request.method == "POST":
			form = NoteForm(request.POST)
			if form.is_valid():
				form_data = form.save(commit=False)
				form_data.user = request.user
				form_data.save()
		else:
			form = NoteForm()
			context = {'form': form}
		return render(request ,'notes/notes.html',context)
	else:
		return render(request,'users/login.html')

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
