from django.urls import path
from . import views

urlpatterns = [
		path('',views.home,name='notes-home'),
		# path('playNotes',views.play_notes,name='play-notes')
]