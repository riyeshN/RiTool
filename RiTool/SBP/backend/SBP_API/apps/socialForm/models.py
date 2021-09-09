from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MinValueValidator, MaxValueValidator
from django.utils import timezone
import statistics


# Create your models here.
class Form(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=50, null=False, blank=False)
    summary = models.TextField(max_length=100, blank=False, null=False)
    details = models.TextField(max_length=350, blank=False, null=False)
    file_url = models.JSONField(null=True, blank=True)
    created_at = models.DateTimeField(default=timezone.now)
    likes = models.IntegerField(default=0, null=False, blank=False, validators=[MinValueValidator(0)])
    dislikes = models.IntegerField(default=0, null=False, blank=False, validators=[MinValueValidator(0)])

    class Meta:
        unique_together = (('user', 'title'),)
        index_together = (('user', 'title'),)

    def no_of_comments(self):
        comments = Comment.objects.filter(form=self)
        return comments.count()

    def likedislikeratio(self):
        if self.likes > 0 and self.dislikes > 0:
            return self.likes / (self.likes + self.dislikes)
        elif self.dislikes > 0 and self.dislike <= 0:
            return -1
        else:
            return 0


class Comment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=False, blank=False)
    form = models.ForeignKey(Form, on_delete=models.CASCADE, blank=False, null=False)
    body_content = models.TextField(max_length=250, blank=False, null=False)
    created_at = models.DateTimeField(default=timezone.now)


class GoogleUser(models.Model):
    userId = models.IntegerField
    created_at = models.DateTimeField(auto_now_add=True)
