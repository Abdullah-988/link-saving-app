from django.urls import path
from . import views

urlpatterns = [
    path('register', views.register),
    path('login', views.login),
    path('user', views.user),
    path('category', views.category),
    path('category/<int:categoryId>', views.categories),
    path('category/<int:categoryId>/link', views.link),
    path('link/<int:linkId>', views.links)
]