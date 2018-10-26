from django.conf.urls import url
from . import views
app_name="crud"
urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^create$', views.create, name='create'),
    url(r'^read$', views.read, name='read'),
    url(r'^edit/(?P<id>\d+)$', views.edit, name='edit'),    
    url(r'^delete/(?P<id>\d+)$', views.delete, name='delete'),
    url(r'^update/(?P<id>\d+)$', views.update, name='update'),    
]