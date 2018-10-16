from django.shortcuts import render, redirect
from .models import Member
from .forms import MemberForm
# Create your views here.
def index(request):
    return render(request, 'crud/index.html')


def create(request):
    member = Member(firstname=request.POST['firstname'], lastname=request.POST['lastname'])
    member.save()
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
        if form.is_valid():
            form.save()
        else:
            print("Not save")
    # member = Member.objects.get(id=id)
    # member.firstname = request.POST['firstname']
    # member.lastname = request.POST['lastname']
    # member.save()
    return redirect('/crud/')


def delete(request, id):
    member = Member.objects.get(id=id)
    member.delete()
    return redirect('/crud/')