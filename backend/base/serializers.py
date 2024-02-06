from rest_framework import serializers
from .models import User, Category, Link

class UserSerializer(serializers.ModelSerializer):
    class Meta(object):
        model = User
        fields = ['id', 'name', 'email', 'password']

class CategorySerializer(serializers.ModelSerializer):
    class Meta(object):
        model = Category
        fields = ['id', 'name', 'owner']

class LinkSerializer(serializers.ModelSerializer):
    class Meta(object):
        model = Link
        fields = ['id', 'link', 'description', 'owner', 'category']