from django.shortcuts import render,redirect
from .forms import SignUpForm
from django.contrib.auth import login,logout,authenticate,update_session_auth_hash
from django.contrib import messages
from django.contrib.auth.forms import PasswordChangeForm


def signup(request):
	if request.method == 'POST':
		form = SignUpForm(request.POST)
		if form.is_valid():
			form.save()
			username = form.cleaned_data.get('username')
			password = form.cleaned_data.get('password1')
			user = authenticate(username=username,password=password)
			login(request,user)
			return redirect('notes-home')
	else:
		form = SignUpForm()
	return render(request,'users/signup.html',{'form':form})

def logout(request):
	user = request.user
	logout(request,user)
	return redirect('login')

def changePassword(request):
	if request.method == 'POST':
		form = PasswordChangeForm(request.user,request.POST)
		if form.is_valid():
			user = form.save()
			update_session_auth_hash(request,user)
			messages.success(request,"Your password was successfully updated")
			return redirect('home')
	else:
		form = PasswordChangeForm()
	return render(request,'changePassword.html',{'form':form})


		
	
	
		
