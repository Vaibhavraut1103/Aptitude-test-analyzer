from django.db import models
from django.contrib.auth.models import User

class OtherDetails(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='student_details')
    name = models.CharField(max_length=100)
    branch = models.CharField(max_length=50)
    year = models.CharField(max_length=2) 
    email = models.EmailField()


# Create your models here.
