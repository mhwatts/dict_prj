from django.http import JsonResponse
from django.views import View
from .models import Word
from rest_framework import generics
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import WordSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet


@api_view(['GET'])
def lookup_word(request, word):
    try:
        word_obj = Word.objects.get(text__iexact=word)
        return Response({"definition": word_obj.definition})
    except Word.DoesNotExist:
        return Response({"error": "Word not found"}, status=404)

class WordViewSet(ModelViewSet):
    queryset = Word.objects.all()
    serializer_class = WordSerializer
    permission_classes = [IsAuthenticated]   # ✅ allow any logged in user

