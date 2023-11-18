from django.urls import path

from . import views

urlpatterns = [
    path("register/", views.register_view, name="register"),
    path("login/", views.login_view, name="login"),
    path("logout/", view=views.user_logout, name="logout"),
    path("status/", view=views.status, name="status"),
    path("authenticate/", views.authenticate_view, name="authenticate"),
    path("service/add/", view=views.add_service, name="add_service"),
    path("services/list/", view=views.list_services, name="list")
]