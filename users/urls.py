from django.urls import path
from django.contrib.auth import views as auth_views
from . import views 

urlpatterns = [
		path('SignUp',views.signup,name='user-signup'),
		# path('SignIn',views.signin,name='user-signin'),
		path('SignIn',auth_views.LoginView.as_view(template_name='users/signin.html'),name='user-signin'),
		path('LogOut',auth_views.LogoutView.as_view(template_name='users/logout.html'),name='user-logout'),
		path('profile',views.profile,name='user-profile'),
		path('change-password',views.changePassword,name='user-change-password')
]