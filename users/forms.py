from django.contrib.auth.models import User
from django import forms
from django.contrib.auth.forms import UserCreationForm

class SignUpForm(UserCreationForm):
	first_name = forms.CharField(max_length=50,required=True)
	last_name = forms.CharField(max_length=50,required=True)
	email = forms.EmailField(max_length=100,required=True)

	class Meta(UserCreationForm.Meta):
		model = User
		fields = UserCreationForm.Meta.fields+('first_name','last_name','email')

	def save(self,commit=True):
		user = super(SignUpForm,self).save(commit=False)
		user.first_name = self.cleaned_data['first_name']
		user.last_name = self.cleaned_data['last_name']
		user.email = self.cleaned_data['email']
		if commit:
			user.save()
		return user
