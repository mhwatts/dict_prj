from django.urls import path, include

urlpatterns = [
    path("api/auth/", include("dj_rest_auth.urls")),
    path("api/auth/registration/", include("dj_rest_auth.registration.urls")),
    path("api/words/", include("words.urls")),   # words CRUD + lookup
]

