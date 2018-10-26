from django.db import models
from phonenumber_field.modelfields import PhoneNumberField
from django.conf import settings
import datetime
# Create your models here.

class Member(models.Model):
	firstname = models.CharField(max_length=40,help_text='Enter Name.')
	email_address = models.EmailField(max_length=40,unique=True,help_text='Enter Email.')
	phone = PhoneNumberField()
	addr= models.TextField()	
	dob = models.DateField(default=datetime.date.today)	
	
	GENDER_CHOICES = ((True, 'Male',), (False, 'Female',))  
	gender = models.BooleanField(choices=GENDER_CHOICES,default=True)

	BGROUP_CHOICES = (
    ('A','A'),
    ('B', 'B'),
    ('AB','AB'),
    ('O','O'),    
	)


	bgroup = models.CharField(max_length=6, choices=BGROUP_CHOICES, default='B')


	def __str__(self):
		return self.firstname + " " + self.email_address