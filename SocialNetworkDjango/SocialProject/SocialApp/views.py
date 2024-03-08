from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import viewsets, permissions, generics, status
from .models import Post, User, ImagesPost, FriendShip, Comment, Like
from .serializers import FriendShipSerializer, PostSerializer, UserSerializer, ImagePostSerializer, CommentSerializer, LikeSerializer
from rest_framework.parsers import MultiPartParser
from rest_framework.decorators import action
from rest_framework.response import Response
from SocialApp import perms



class UserViewSet(viewsets.ViewSet,
                  generics.ListAPIView,  #Hiện list users
                  generics.CreateAPIView,  #Hiện thực api create user (post)
                  generics.RetrieveAPIView):  #Hiện thực api lấy user (get)
    queryset = User.objects.filter(is_active=True).all()
    serializer_class = UserSerializer
    parser_classes = [MultiPartParser]

    def get_permissions(self):
        if self.action.__eq__("current_user"):
            return [permissions.IsAuthenticated()]

        return [permissions.AllowAny()]

    @action(methods=['get'], url_path='current-user' ,url_name='current-user', detail=False)
    def current_user(self, request):
        return Response(UserSerializer(request.user).data)

    @action(methods=['get'], detail=True)
    def posts(self, request, pk):
        posts = self.get_object().post_set.all()

        return Response(PostSerializer(posts, many=True, context={'request': request}).data,
                        status=status.HTTP_200_OK)


class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.filter(active=True)
    serializer_class = PostSerializer

    @action(methods=['get'], detail=True)
    def imagePosts(self, request, pk):
        imagePosts = self.get_object().imagespost_set.all()

        return Response(ImagePostSerializer(imagePosts, many=True, context={'request': request}).data,
                        status=status.HTTP_200_OK)

    @action(methods=['get'], detail=True)
    def comments(self, request, pk):
        comments = self.get_object().comment_set.all()

        return Response(CommentSerializer(comments, many=True, context={'request': request}).data,
                        status=status.HTTP_200_OK)

    @action(methods=['get'], detail=True)
    def likes(self, request, pk):
        likes = self.get_object().like_set.all()

        return Response(LikeSerializer(likes, many=True, context={'request': request}).data,
                        status=status.HTTP_200_OK)


class ImagePostViewSet(viewsets.ModelViewSet):
    queryset = ImagesPost.objects.all()
    serializer_class = ImagePostSerializer


class FriendShipViewSet(viewsets.ModelViewSet):
    queryset = FriendShip.objects.all()
    serializer_class = FriendShipSerializer

    @action(methods=['get'], detail=True)
    def get_friendship(self, request):
        user1_id = request.query_params.get('user1_id')
        user2_id = request.query_params.get('user2_id')

        try:
            friendship = FriendShip.objects.get(user_one=user1_id, user_two=user2_id)
            serializer = FriendShipSerializer(friendship)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except FriendShip.DoesNotExist:
            return Response("Friendship does not exist.", status=status.HTTP_404_NOT_FOUND)

class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

class LikeViewSet(viewsets.ModelViewSet):
    queryset = Like.objects.all()
    serializer_class = LikeSerializer

    @action(methods=['get'], detail=False, url_path='get_like')
    def get_like(self, request):
        post = request.query_params.get('post')
        user = request.query_params.get('user')

        try:
            like = Like.objects.get(post=post, user=user)
            serializer = LikeSerializer(like)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Like.DoesNotExist:
            return Response("Like does not exist.", status=status.HTTP_404_NOT_FOUND)
