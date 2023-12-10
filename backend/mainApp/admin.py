from django.contrib import admin
from .models import *

"""
Rejestruje modele Django w panelu admina.

Automatycznie rejestruje modele `UserProfile` i `CreditStorage` w panelu admina Django,
umożliwiając ich zarządzanie przez interfejs administracyjny.

:return: Brak zwracanej wartości.
"""
admin.site.register(UserProfile)
admin.site.register(CreditStorage)

