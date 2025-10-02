# words/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import WordViewSet

router = DefaultRouter()
router.register(r'', WordViewSet, basename='word')

urlpatterns = [
    path('', include(router.urls)),   # /api/words/ → full CRUD
]
