from rest_framework import serializers
from rest_framework.authtoken.models import Token
from django.contrib.auth.password_validation import validate_password
from .models import Form, Comment, User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'password', 'email', 'first_name', 'last_name')
        extra_kwargs = {
            'password': {'write_only': True, 'required': True, 'min_length': 9, 'validators': [validate_password]},
            'first_name': {'required': True},
            'last_name': {'required': True},
            'email': {'required': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        Token.objects.create(user=user)
        return user


class TokenSerializer(serializers.ModelSerializer):
    class Meta:
        model = Token
        fields = ('key', 'user')


class FormSerializer(serializers.ModelSerializer):
    class Meta:
        model = Form
        fields = (
            'id', 'user', 'title', 'summary', 'created_at', 'details', 'file_url', 'no_of_comments', 'likedislikeratio'
        )


class FormGetSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Form
        fields = (
            'id', 'user', 'title', 'summary', 'created_at', 'details', 'file_url', 'no_of_comments', 'likedislikeratio'
        )


class CommentSerializer(serializers.ModelSerializer):
    # user = UserSerializer(many=False)
    # form = FormSerializer(many=False)

    class Meta:
        model = Comment
        fields = ('id', 'user', 'form', 'body_content', 'created_at')


class CommentGetSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Comment
        fields = ('id', 'user', 'form', 'body_content', 'created_at')
