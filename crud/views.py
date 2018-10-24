from django.shortcuts import render, redirect
from .models import Member
from .forms import MemberForm
from django.http import HttpResponse


# Create your views here.
def index(request):
    return render(request, 'crud/index.html')


def create(request):    
    if request.method == "POST":
        member=MemberForm(request.POST)
        #print(member)
        if member.is_valid():
            member.save()
        else:
            print("Create Not save")                        
            print(member.errors)        
        return redirect('/')

def read(request):
    members = Member.objects.all()
    context = {'members': members}
    return render(request, 'crud/result.html', context)

def edit(request, id):
    members = Member.objects.get(id=id)
    context = {'member': members}
    return render(request, 'crud/edit.html', context)


def update(request, id):
    if request.method == "POST":
        member = Member.objects.get(id=id)
        form=MemberForm(request.POST,instance=member)          
        #print(form)
        if form.is_valid():            
            form.save()
        else:
            print(form.errors)
            print("Not save")
    return redirect('/')


def delete(request, id):
    member = Member.objects.get(id=id)
    member.delete()
    return redirect('/')