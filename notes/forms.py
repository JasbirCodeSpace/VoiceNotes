from django import forms
from .models import Note


class NoteForm(forms.ModelForm):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['title'].widget.attrs.update({'class': 'speech-input'})
        self.fields['content'].widget.attrs.update({'class': 'speech-input'})

    class Meta:
        model = Note
        fields = '__all__'
        exclude = ['user']
        widgets = {
            'tags': forms.TextInput(
                attrs={
                    'data-role':'tagsinput',
                }
            ),
        }
