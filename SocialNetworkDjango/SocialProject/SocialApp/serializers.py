from dataclasses import fields
from rest_framework.serializers import ModelSerializer, SerializerMethodField
from .models import Post, User, ImagesPost, FriendShip, Comment, Like



class UserSerializer(ModelSerializer):
    # avatar = SerializerMethodField(source='avatar')
    avatarCover = SerializerMethodField(source='avatarCover')

    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'email', 'username', 'password', 'avatar', 'userRole', 'avatarCover']
        extra_kwargs = {
            'password': {'write_only': 'true'}  # Chỉ để ghi, không hiện ra
        }


    # def get_avatar(self, user):
    #     if user.avatar:
    #         request = self.context.get('request')
    #         if request:
    #             return request.build_absolute_uri('/static/%s' % user.avatar.name)
    #         return '/static/%s' % user.avatar.name

    def get_avatarCover(self, user):
        if user.avatarCover:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri('/static/%s' % user.avatarCover.name)
            return '/static/%s' % user.avatarCover.name


    def create(self, validated_data): 
        user = User(**validated_data)
        user.set_password(validated_data['password'])
        user.save()

        return user


class PostSerializer(ModelSerializer):
    # user = UserSerializer()
    class Meta:
        model = Post
        fields = ['id', 'content', 'user', 'active', "created_date"];


class ImagePostSerializer(ModelSerializer):
    # image = SerializerMethodField(source='avatar')

    # def get_image(self, imagepost):
    #     if imagepost.image:
    #         request = self.context.get('request')
    #         if request:
    #             return request.build_absolute_uri('/static/%s' % imagepost.image.name)
    #         return '/static/%s' % imagepost.image.name

    class Meta:
        model = ImagesPost
        fields = ['id', 'image', 'post']

class FriendShipSerializer(ModelSerializer):
    # user = UserSerializer()
    class Meta:
        model = FriendShip
        fields = '__all__'

class CommentSerializer(ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'

class LikeSerializer(ModelSerializer):
    class Meta:
        model = Like
        fields = '__all__'