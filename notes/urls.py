from django.urls import path
from . import views

urlpatterns = [
		path('',views.home,name='notes-home'),
		path('notes/edit/<int:id>',views.update_note,name='note-edit'),
		path('notes/delete/confirm/<int:id>',views.delete_note_confirm,name='note-delete-confirm'),
		path('notes/delete/<int:id>',views.delete_note,name='note-delete')
		# path('playNotes',views.play_notes,name='play-notes')
]