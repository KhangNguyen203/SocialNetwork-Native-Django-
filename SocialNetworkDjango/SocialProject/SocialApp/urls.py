from django.contrib import admin
from django.urls import path, include
from . import views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('posts', views.PostViewSet)
router.register('users', views.UserViewSet)
router.register('imagePosts', views.ImagePostViewSet)
router.register('FriendShips', views.FriendShipViewSet)
router.register('comments', views.CommentViewSet)
router.register('likes', views.LikeViewSet)



urlpatterns = [
    path('', include(router.urls)),
    path('friendship/get_friendship/', views.FriendShipViewSet.as_view({'get': 'get_friendship'}), name='get_friendship'),
]
