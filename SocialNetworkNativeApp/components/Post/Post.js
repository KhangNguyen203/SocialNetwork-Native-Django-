import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, ActivityIndicator, Image, TouchableOpacity } from 'react-native';
import API, { endpoints } from '../../configs/API';
import MyStyles from '../../styles/MyStyles';
import moment from "moment";
import 'moment/locale/vi';
import PostImage from './PostImage';
import Style from './Style';
import { useNavigation } from '@react-navigation/native';
import Like from './Like';
import MyContext from '../../configs/MyContext';


const Post = ({post}) => {
  const [userr, setUserr] = useState(null);
  const [user,] = useContext(MyContext);
  moment.locale('vi');
  const navigation = useNavigation();


  useEffect(() => {
    const loadUser = async () => {
      try {
        let res = await API.get(endpoints['users'](post.user));
        setUserr(res.data);
      } catch (ex) {
        console.error(ex);
      }
    } 
    loadUser();
  },[post])


  const goToPostDetail = async (post, userr) => {
    navigation.navigate("PostDetail", { post: post, userr: userr });
  };

  const addCloudinaryDomain = (publicId) => {
    const cloudinaryDomain = `res.cloudinary.com/dvebfxho2/`;
    return `https://${cloudinaryDomain}${publicId}`;
  };



  const handleComment = () => {
    // Xử lý khi người dùng nhấn vào nút bình luận
  };

  const handleShare = () => {
    // Xử lý khi người dùng nhấn vào nút chia sẻ
  };

  return (
    <View style={Style.container}>
      {userr === null? <ActivityIndicator/>: 
        <>
          <TouchableOpacity key={post.id} onPress={() => goToPostDetail(post, userr)}>
            <View style={MyStyles.row}>
              <Image source={{uri: addCloudinaryDomain(userr.avatar)}} style={MyStyles.avatar}/>
              <View>
                <Text style={Style.title}>{userr.username}</Text>
                <Text style={Style.time}>{moment(post.created_date).fromNow()}</Text>
              </View>
            </View>
          
            <Text style={Style.content}>{post.content}</Text>

            <PostImage postID = {post.id}/>

            <View style={Style.buttonContainer}>
              <Like post={post} user={user}/>
              <Button title="Bình luận" onPress={handleComment} />
              <Button title="Chia sẻ" onPress={handleShare} />
            </View>
          </TouchableOpacity>
        </>
      }
    </View>
  );
};

export default Post;