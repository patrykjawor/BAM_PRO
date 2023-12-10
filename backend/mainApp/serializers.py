from rest_framework.serializers import ModelSerializer
from .models import CreditStorage

class CreditSerializer(ModelSerializer):
    """
    Serializer dla modelu `CreditStorage`.

    Klasa `CreditSerializer` służy do serializacji modelu `CreditStorage`.
    Konwertuje dane modelu na format JSON do wykorzystania w interfejsach API.

    """
    class Meta:
        model = CreditStorage
        fields = ['pk', 'name', 'icon', 'username', 'password']
