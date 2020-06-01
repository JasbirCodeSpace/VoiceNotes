from django.db import models
from django.contrib.auth.models import User

class Note(models.Model):
	user  = models.ForeignKey(User,on_delete = models.CASCADE)
	title = models.CharField(max_length=100)
	content = models.TextField()
	date_created = models.DateTimeField(auto_now_add = True)
	date_modified = models.DateTimeField(auto_now = True)

	def __str__(self):
		return self.title

	def save(self, *args, **kwargs):
		super().save(*args,**kwargs)