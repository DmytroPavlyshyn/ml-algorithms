from django.db import models
from django.contrib.auth.models import User

class ExecutionHistoryModel(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    date = models.DateTimeField(default=timezone.now)
    body = models.CharField(default='', max_length=10000)