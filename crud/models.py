from django.db import models
from phonenumber_field.modelfields import PhoneNumberField

# Create your models here.




class Member(models.Model):
	firstname = models.CharField(max_length=40)
	lastname = models.EmailField(max_length=40)
	phone = PhoneNumberField()
	addr= models.TextField()	

	GENDER_CHOICES = ((True, 'Male',), (False, 'Female',))  
	gender = models.BooleanField(choices=GENDER_CHOICES)


	def __str__(self):
		return self.firstname + " " + self.lastname