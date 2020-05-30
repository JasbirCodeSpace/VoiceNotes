from django.urls import path
from . import views 

urlpatterns = [
		path('SignUp',views.signup,name='user-signup'),
]