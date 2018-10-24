from django import forms
from .models import Member
from django.core.exceptions import ValidationError
from django.utils.translation import ugettext_lazy as _
import datetime


class MemberForm(forms.ModelForm):
    
    class Meta:        
        model = Member
        fields = ['firstname', 'email_address','phone','addr','gender','dob','bgroup']
        widgets = {'gender': forms.RadioSelect()
        }

    def clean_dob(self):
        data = self.cleaned_data['dob']
        
        # Check if a date is not in the future. 
        if data > datetime.date.today():
            raise ValidationError(_('Invalid date - Date of Birth in future.'))
        
        # Remember to always return the cleaned data.
        return data

  
        