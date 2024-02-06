
from django.shortcuts import get_object_or_404
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework import status 

from .models import User, Category, Link
from .serializers import UserSerializer, CategorySerializer, LinkSerializer

@api_view(['POST'])
def register(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        user = User.objects.get(email=request.data['email'])
        user.set_password(request.data['password'])
        user.save()
        token = Token.objects.create(user=user)

        return Response({ 'token': token.key, 'user': serializer.data }, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def login(request):
    email = request.data['email']
    password = request.data['password']
    
    user = get_object_or_404(User, email=email)
    
    if not user.check_password(password):
        return Response("Invalid credentials", status=status.HTTP_404_NOT_FOUND)
    
    token, created = Token.objects.get_or_create(user=user)

    serializer = UserSerializer(user)

    return Response({ "token": token.key, 'user': serializer.data })


@api_view(['GET'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def user(request):
    return Response({ "id": request.user.id, "email": request.user.email, "name": request.user.name })


@api_view(['GET', 'POST'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def category(request):
    if request.method == "GET":
        categories = Category.objects.filter(owner=request.user)
        serializer = CategorySerializer(categories, many=True)
        return Response(serializer.data)
    
    if request.method == "POST":
        if 'name' not in request.data:
            return Response("Missing name field", status=status.HTTP_400_BAD_REQUEST)
        
        request.data['owner'] = request.user.id
        
        serializer = CategorySerializer(data=request.data)

        if serializer.is_valid():
            serializer.save(owner=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT', 'DELETE'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def categories(request, categoryId):
    if request.method == "PUT":
        category = get_object_or_404(Category, pk=categoryId, owner=request.user.id)

        if 'name' not in request.data:
            return Response("Missing name field", status=status.HTTP_400_BAD_REQUEST)
        
        serializer = CategorySerializer(category, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        
    if request.method == "DELETE":
        category = get_object_or_404(Category, pk=categoryId, owner=request.user.id)
        category.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'POST'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def link(request, categoryId):
    get_object_or_404(Category, pk=categoryId, owner=request.user.id)
    if request.method == "GET":
        links = Link.objects.filter(category__id=categoryId, owner=request.user)

        serializer = LinkSerializer(links, many=True)
        return Response(serializer.data)
    
    if request.method == "POST":
        if 'link' not in request.data or 'description' not in request.data:
            return Response("Missing required fields", status=status.HTTP_400_BAD_REQUEST)
        
        request.data['category'] = categoryId
        request.data['owner'] = request.user.id
        
        serializer = LinkSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save(owner=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT', 'DELETE'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def links(request, linkId):
    if request.method == "PUT":
        link = get_object_or_404(Link, pk=linkId, owner=request.user.id)

        if 'link' not in request.data or 'description' not in request.data:
            return Response("Missing required fields", status=status.HTTP_400_BAD_REQUEST)
        
        serializer = LinkSerializer(link, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        
    if request.method == "DELETE":
        link = get_object_or_404(Link, pk=linkId, owner=request.user.id)
        link.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)