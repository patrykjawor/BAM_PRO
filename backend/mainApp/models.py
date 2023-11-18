from django.db import models
from django.contrib.auth.models import User
from django_otp.plugins.otp_totp.models import TOTPDevice
from django_cryptography.fields import encrypt


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    totp_device = models.OneToOneField(TOTPDevice, null=True, blank=True, on_delete=models.CASCADE)


class CreditStorage(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=32)
    icon = models.JSONField(null=False)
    username = encrypt(models.CharField(max_length=128))
    password = encrypt(models.CharField(max_length=150))
    
