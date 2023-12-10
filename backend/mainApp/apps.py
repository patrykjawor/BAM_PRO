from django.apps import AppConfig


class MainappConfig(AppConfig):
    """
    Konfiguracja aplikacji Django o nazwie 'mainApp'.

    Klasa `MainappConfig` definiuje konfigurację głównej aplikacji Django o nazwie 'mainApp'.
    Zawiera parametr `default_auto_field`, który określa domyślne pole automatyczne dla modeli.

    :ivar default_auto_field: Pole automatyczne używane jako domyślne dla modeli w aplikacji.
    :vartype default_auto_field: str
    :ivar name: Nazwa aplikacji Django.
    :vartype name: str
    """
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'mainApp'
