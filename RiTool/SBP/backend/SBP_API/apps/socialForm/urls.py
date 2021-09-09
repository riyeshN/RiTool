from django.contrib import admin
from django.urls import path
from django.conf.urls import include
from rest_framework import routers
from .views import UserViewSet, CommentViewSet, FormViewSet, TokenViewSet, FormGetViewSet, FriendShipViewSet, \
    CommentGetViewSet

router = routers.DefaultRouter()
router.register('forms', FormViewSet)
router.register('formget', FormGetViewSet)
router.register('comments', CommentViewSet)
router.register('comments_get', CommentGetViewSet)
router.register('users', UserViewSet)
router.register('token', TokenViewSet)
router.register('friendship', FriendShipViewSet, basename='FriendShipViewSet')

urlpatterns = [
    path('', include(router.urls)),
]