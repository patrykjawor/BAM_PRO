from django.db import models
from django.contrib.auth.models import User
from django_otp.plugins.otp_totp.models import TOTPDevice
from django_cryptography.fields import encrypt


class UserProfile(models.Model):
    """
    Profil użytkownika aplikacji.

    Klasa `UserProfile` definiuje profil użytkownika, powiązany z modelem wbudowanym `User`.
    Zawiera również pole `totp_device` reprezentujące urządzenie TOTP (Time-based One-Time Password).

    :ivar user: Powiązanie z modelem użytkownika Django.
    :vartype user: User
    :ivar totp_device: Powiązanie z urządzeniem TOTP (opcjonalne).
    :vartype totp_device: TOTPDevice
    """
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    totp_device = models.OneToOneField(TOTPDevice, null=True, blank=True, on_delete=models.CASCADE)


class CreditStorage(models.Model):
    """
    Przechowywanie danych związanego z zapisanymi serwisami.

    Klasa `CreditStorage` definiuje model przechowujący dane związane z serwisami.
    Powiązany jest z modelem `User` reprezentującym użytkownika.

    :ivar user: Powiązanie z modelem użytkownika Django.
    :vartype user: User
    :ivar name: Nazwa przechowywanych danych.
    :vartype name: str
    :ivar icon: Ikona powiązana z danymi serwisu (w formacie JSON).
    :vartype icon: dict
    :ivar username: Zaszyfrowane pole przechowujące nazwę użytkownika.
    :vartype username: encrypt
    :ivar password: Zaszyfrowane pole przechowujące hasło użytkownika.
    :vartype password: encrypt
    """
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=32)
    icon = models.JSONField(null=False)
    username = encrypt(models.CharField(max_length=128))
    password = encrypt(models.CharField(max_length=150))
    
