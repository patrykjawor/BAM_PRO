from django.urls import path

from . import views

urlpatterns = [
    path("register/", views.register_view, name="register"),
    # Widok rejestracji nowego użytkownika

    path("login/", views.login_view, name="login"),
    # Widok logowania użytkownika

    path("logout/", view=views.user_logout, name="logout"),
    # Widok wylogowania użytkownika

    path("status/", view=views.status, name="status"),
    # Widok zwracający status uwierzytelnienia użytkownika

    path("authenticate/", views.authenticate_view, name="authenticate"),
    # Widok uwierzytelniania użytkownika z dwuetapową weryfikacją

    path("service/add/", view=views.add_service, name="add_service"),
    # Widok dodawania nowej usługi

    path("services/list/", view=views.list_services, name="list"),
    # Widok listowania usług użytkownika

    path("services/delete/<int:id>/", view=views.delete_service, name="delete"),
    # Widok usuwania usługi
]