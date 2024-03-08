from django.contrib import admin
from .models import User, Post, Comment, ImagesPost, FriendShip, Like
from django.utils.html import mark_safe


class PostAdmin(admin.ModelAdmin):
    list_display = ["content", "created_date"]
    search_fields = [ "content"]
    list_filter = ["content"]


class UseAdmin(admin.ModelAdmin):
    list_display = ["username", "email"]
    readonly_fields = ["img", "imgcover"]

    def img(self, user):
        if user.avatar:
            image_url = user.avatar.url
            return mark_safe(
                '<img src="{url}"  width="120"/>'.format(url=image_url)
            )
        else:
            return '-'

    def imgcover(self, user):
        if user: 
            return mark_safe(
                '<img src="/static/{url}"  width="120"/>'.format(url=user.avatarCover.name)
            )


class ImagePostAdmin(admin.ModelAdmin):
    list_display = ["image"]
    readonly_fields = ["img"]

    def img(self, imagepost):
        if imagepost.image:
            image_url = imagepost.image.url
            return mark_safe(
                '<img src="{url}"  width="120"/>'.format(url=image_url)
            )
        else:
            return '-'

# class FriendShipAdmin(admin.ModelAdmin): 
#     list_display ['user_one', 'user_two', 'status', 'created_date']


# Register your models here.
admin.site.register(User, UseAdmin)
admin.site.register(Post, PostAdmin)
admin.site.register(Comment)
admin.site.register(ImagesPost,ImagePostAdmin)
admin.site.register(FriendShip)
admin.site.register(Like)

