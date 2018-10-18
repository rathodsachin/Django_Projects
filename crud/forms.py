from django import forms
from .models import Member


class MemberForm(forms.ModelForm):
        
    class Meta:        
        model = Member
        fields = ['firstname', 'lastname','phone','addr','gender']
        widgets = {'gender': forms.RadioSelect()
        }

        