from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

class Notes(models.Model):
	user  = models.ForeignKey(User,on_delete = models.CASCADE)
	title = models.CharField(max_length=100)
	content = models.TextField()
	date_created = models.DateTimeField(default=timezone.now,auto_now_add = True)
	date_modified = models.DateTimeField(default=timezone.now,auto_now = True)

	def __str__(self):
		retuen self.title