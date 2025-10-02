# words/models.py
from django.db import models

class Word(models.Model):
    text = models.CharField(max_length=100, unique=True)
    definition = models.TextField()

    def __str__(self):
        return self.text

