from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from .models import UserProfile
from django_otp.plugins.otp_totp.models import TOTPDevice

class UserForm(UserCreationForm):
	"""
    Formularz rejestracji użytkownika.

    Klasa `UserForm` dziedziczy po `UserCreationForm` i dodaje pole email.
    Używa modelu `User` i zawiera funkcję `save()`, która zapisuje użytkownika
    do bazy danych.

    :ivar email: Pole email użytkownika.
    :vartype email: forms.EmailField
    """
	email = forms.EmailField(required=True)

	class Meta:
		model = User
		fields = ("username", "email", "password1", "password2")

	def save(self, commit=True):
		"""
        Zapisuje użytkownika do bazy danych.

        Funkcja `save()` zapisuje nowego użytkownika do bazy danych.
        Jeśli `commit` jest ustawione na `True`, użytkownik zostanie zapisany
        do bazy danych.

        :param commit: Flaga wskazująca, czy zapisać użytkownika do bazy danych. Domyślnie True.
        :type commit: bool
        :return: Użytkownik zapisany w bazie danych.
        :rtype: User
        """
		user = super(UserForm, self).save(commit=False)
		user.email = self.cleaned_data['email']
		if commit:
			user.save()
		return user