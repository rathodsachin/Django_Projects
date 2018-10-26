from django.shortcuts import render, redirect
from .models import Member
from .forms import MemberForm
from django.http import HttpResponse
from django.http import JsonResponse
from django.shortcuts import render_to_response
from django.template.loader import render_to_string




# Create your views here.
def index(request):
    if request.method == "POST":
        form=MemberForm(request.POST)        
        return render(request, 'crud/index.html', {'form': form})
    else:
        form=MemberForm()
        return render(request, 'crud/index.html', {'form': form})


def create(request):   
    # import pdb;pdb.set_trace() 
    data = dict()
    if request.method == "POST":
        form=MemberForm(request.POST)
        #print(member)
        if form.is_valid():
            form.save()                    
            data['form_is_valid'] = True
        else:
            data['form_is_valid'] = False
            print(form.errors)
            context = {'form': form}
            data['html_form'] = render_to_string('crud/index.html',
            context,
            request=request,
            )
        return JsonResponse(data)            
        


def read(request):
    members = Member.objects.all()
    context = {'members': members}
    return render(request, 'crud/result.html', context)

def edit(request, id):
    members = Member.objects.get(id=id)
    context = {'member': members}
    return render(request, 'crud/edit.html', context)


def update(request, id):
    data = dict()
    if request.method == "POST":
        member = Member.objects.get(id=id)
        form=MemberForm(request.POST,instance=member)          
        #print(form) 

        if form.is_valid():            
            form.save()
            data['form_is_valid'] = True
        else:
            data['form_is_valid'] = False
            print(form.errors)
            context = {'form': form}
            data['html_form'] = render_to_string('crud/index.html',
            context,
            request=request,
            )
        return JsonResponse(data)


def delete(request, id):
    member = Member.objects.get(id=id)
    member.delete()
    return redirect('/')