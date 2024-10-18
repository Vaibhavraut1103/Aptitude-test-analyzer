from django.urls import path
from . import views

urlpatterns = [
    path("api/v1/auth/login",views.login_check,name="Login"),
    path("api/v1/auth/signup",views.signup,name="Signup"),
    path('api/v1/auth/check-session', views.check_session),
 
]
