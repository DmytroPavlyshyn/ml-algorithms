from django.db import models
from django.contrib.auth.models import User

class ExecutionModel(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    args = models.CharField(default='', max_length=10000)
    test_path = models.CharField(default='', max_length=100)
    train_path = models.CharField(default='', max_length=100)
    test_prediction_path = models.CharField(default='', max_length=100)
    train_prediction_path = models.CharField(default='', max_length=100)
    calculation_errors = models.CharField(default='', max_length=1000)