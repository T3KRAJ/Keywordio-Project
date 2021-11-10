from accounts.models import Books
from djoser.serializers import UserCreateSerializer
from django.contrib.auth import get_user_model
from rest_framework import serializers

User = get_user_model()

class UserCreateSerializer(UserCreateSerializer):

    class Meta:
        model = User
        fields = ('id', 'email', 'name', 'password')

class BookSerializer(serializers.ModelSerializer):

    class Meta:
        model = Books
        fields = '__all__'