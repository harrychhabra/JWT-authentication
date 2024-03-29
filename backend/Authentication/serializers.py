from rest_framework import serializers as sz
from rest_framework.settings import api_settings
from django.utils import timezone
from django.contrib.auth.models import User

class GetFullUserSerializer(sz.ModelSerializer):
    class Meta:
        model = User
        fields = ('username','is_superuser','first_name', 'last_name')


class UserSerializerWithToken(sz.ModelSerializer):
    password = sz.CharField(write_only=True)
    token = sz.SerializerMethodField()

    def get_token(self, object):
        jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
        jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

        payload = jwt_payload_handler(object)
        token = jwt_encode_handler(payload)
        return token
        
    def create(self, validated_data):
        user = User.objects.create(
            username = validated_data['username'],
            first_name = "test_user",
            last_name = "test_user" 
        )
        user.set_password(validated_data['password'])
        user.save()
        return user
    class Meta:
        model = User
        fields = ('token', 'username', 'password', 'first_name', 'last_name')
